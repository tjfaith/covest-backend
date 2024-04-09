import { prismaClient } from "@/database";
import {
  VerifyPayment,
  InitializePayment,
  EmailRequirement,
  InitializeBankTransfer,
  VerifyBankTransfer,
} from "@/interfaces";
import {
  initializePaystack,
  sendMail,
  successfulBankTransfer,
  uploadImage,
  verifyPaystack,
} from "@/services";

export const initializePayment = async (payload: InitializePayment) => {
  const { amount, email, userId, unitBought, estimatedRoi, propertyId } =
    payload;
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        AND: [{ email: email }, { id: userId }],
      },
    });

    if (!user) {
      return {
        status: 404,
        message: "User not found, You can only make payment with your account",
      };
    }

    const property = await prismaClient.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return {
        status: 404,
        message: "Selected property not found",
        data: {},
      };
    }

    if (property.total_units_sold >= property.total_units) {
      return {
        status: 403,
        message: "Selected property is sold out",
        data: {},
      };
    }

    if (unitBought+property.total_units_sold > property.total_units) {
      return {
        status: 403,
        message: "Property Unit exceeded",
        data: {},
      };
    }

    const response = await initializePaystack({
      amount: amount * 100,
      email: email,
      billName: userId,
    });

    if (!response.data.data.reference) {
      return { status: 400, message: "Payment not created. Retry again" };
    }

    const newPayment = await prismaClient.payment.create({
      data: {
        authorization_url: response.data.data.authorization_url,
        payment_type: "online",
        access_code: response.data.data.access_code,
        reference: response.data.data.reference,
        amount: amount,
        user_id: userId,
        status: "pending",
        property_id: propertyId,
      },
    });

    if (!newPayment) {
      return { status: 400, message: "Payment not created" };
    }

    if (response.data.status === "error") {
      return { status: 400, message: response.data.message };
    }
 
    
    if (response.data.status === true ) {
      // Add property to user property
       const userProperty = await prismaClient.userProperty.create({
        data: {
          property_id: propertyId,
          user_id: userId,
          roi: property.roi,
          unit_price: property.price,
          unit_bought: unitBought,
          estimated_roi: estimatedRoi,
          total_amount_paid: amount * 100,
          payment_id:newPayment.id
        },
      });
  
  
      return {
        status: 201,
        message: response.data.message,
        data: response.data.data,
        userProperty
      };
    }
    return {
      status: 400,
      message: "Payment not initialized",
      data: response.data.data,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

export const verifyPaymentService = async (paymentData: VerifyPayment) => {
  try {
    const existingPayment = await prismaClient.payment.findUnique({
      where: { reference: paymentData.paymentRef },
    });

    if (!existingPayment) {
      return {
        status: 404,
        message: `Payment with reference ID: ${paymentData.paymentRef} not found`,
      };
    }

    if (existingPayment.status === "success") {
      return {
        status: 200,
        message: `Payment with reference ID: ${paymentData.paymentRef} has already been verified successfully `,
        data:
          existingPayment.payment_full_details &&
          JSON.parse(existingPayment.payment_full_details),
      };
    }

    if (existingPayment.status === "failed") {
      return {
        status: 400,
        message: `Payment with reference ID: ${paymentData.paymentRef} failed, please re-initialize `,
      };
    }

    // if (existingPayment.amount !== paymentData.amount * 100) {
    //   return {
    //     status: 400,
    //     message: `Payment with reference ID: ${paymentData.paymentRef} can't be verified, check the payment details `,
    //   };
    // }

    const response = await verifyPaystack(paymentData.paymentRef);

    if (response.gateway_response !== "Successful") {
      return {
        status: 400,
        message: response.message,
        data: response,
      };
    }

    await prismaClient.payment.update({
      where: { id: existingPayment.id },
      data: {
        status: "success",
        updated_at: response.created_at,
        payment_full_details: JSON.stringify(response),
      },
    });

    const userProperty = await prismaClient.userProperty.findUnique({
      where: { payment_id: existingPayment.id },
    });

      // Update property
      await prismaClient.property.update({
        where: { id: existingPayment.property_id },
        data: {
          total_units_sold: {
            increment: userProperty?.unit_bought || 0,
          },
        },
      });
      

    return {
      status: 201,
      message: "Payment verified successfully!",
      data: response,
    };
  } catch (error) {
    return {
      status: 500,
      message: "internal server error..",
    };
  }
};

// BANK TRANSFER
export const initiateBankTransfer = async (
  transferDetails: InitializeBankTransfer
) => {
  try {
    const { property_id, user_id, paymentRef, amount, file } = transferDetails;
    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return { status: 401, message: "Un-authorized" };
    }

    if (!file) {
      return {
        status: 401,
        message: "You must submit prove of payment in Image format",
      };
    }
    const property = await prismaClient.property.findUnique({
      where: {
        id: property_id,
      },
    });
    if (!property) {
      return {
        status: 404,
        message: "Selected property not found",
      };
    }
    const result = await uploadImage(file, "COvest/payment");

    const bankTransfer = await prismaClient.payment.create({
      data: {
        authorization_url: JSON.stringify(result),
        property_id: property.id,
        payment_type: "bank_transfer",
        reference: paymentRef,
        amount: parseFloat(amount),
        user_id: user_id,
        status: "pending",
      },
    });

    const transfer_details = {
      bankName: process.env.BANK_NAME || "Access bank",
      accountName: process.env.ACCOUNT_NAME || "covest",
      accountNumber: process.env.ACCOUNT_NUMBER || "0128003799",
      amount: amount,
    };
    const message_payload: EmailRequirement = {
      to: [user.email],
      subject: "Payment Recorded",
      text: "Your payment has been recorded successfully",
      template: successfulBankTransfer(transfer_details),
    };
    sendMail(message_payload);

    return {
      status: 201,
      message:
        "Payment recorded successfully, your payment is now pending verification",
      data: bankTransfer,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
      data: error,
    };
  }
};

export const verifyTransfer = async (transferDetails: VerifyBankTransfer) => {
  try {
    const {
      payment_id,
      property_id,
      payee_id,
      paymentProfID,
      amount,
      paymentRef,
      validator_id,
    } = transferDetails;
    const user = await prismaClient.user.findUnique({
      where: { id: validator_id },
    });

    if (user?.role === "retailer") {
      return {
        status: 401,
        message: "You are not authorized to validate a payment, contact admin",
      };
    }

    const payment = await prismaClient.payment.findFirst({
      where: {
        AND: [
          { id: payment_id },
          { status: "pending" },
          { property_id },
          { user_id: payee_id },
          { amount },
          { reference: paymentRef },
        ],
      },
    });

    if (!payment) {
      return {
        status: 404,
        message: "Pending payment not found, reconfirm details",
      };
    }
    if (!payment.authorization_url) {
      return {
        status: 400,
        message:
          "This payment do not have prove, request for prove of payment from client",
      };
    }

    const paymentProf = JSON.parse(payment.authorization_url);
    if (paymentProf.fileId !== paymentProfID) {
      return {
        status: 400,
        message: "Invalid payment prove ID",
      };
    }

    const validate_payment = await prismaClient.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: "success",
      },
    });
    return {
      status: 200,
      message: "Payment verified, successfully",
      data: validate_payment,
    };
  } catch (error) {
    return { status: 500, message: "Internal server error", data: error };
  }
};
