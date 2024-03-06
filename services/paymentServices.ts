import { prismaClient } from "@/database";
import { VerifyPayment, InitializePayment } from "@/interfaces";
import { initializePaystack, verifyPaystack } from "@/services";

export const initializePayment = async (payload: InitializePayment) => {
  const { amount, email, userId, propertyId } = payload;
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
        id:propertyId
      },
    }); 

    if(!property){
      return {
        status: 404,
        message: "Selected property not found",
        data:{}
      };
    }

    const response = await initializePaystack({
      amount: amount * 100,
      email: email,
      billName: userId,
    },)


    
    if (!response.data.data.reference) {
      return { status: 400, message: "Payment not created. Retry again" };
    }

    const newPayment = await prismaClient.payment.create({
      data: {
        authorization_url: response.data.data.authorization_url,
        access_code: response.data.data.access_code,
        reference: response.data.data.reference,
        amount:amount * 100,
        user_id:userId,
        status: "pending",
      },
    });

    if (!newPayment) {
      return { status: 400, message: "Payment not created" };
    }

    if (response.data.status === "error") {
      return { status: 400, message: response.data.message };
    }
    if (response.data.status === true) {
      return {
        status: 201,
        message: response.data.message,
        data: response.data.data,
      };
    }
    return {
      status: 201,
      message: "Payment Initialized successfully!",
      data: response.data.data,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};


export const verifyPaymentService = async(paymentData:VerifyPayment)=>{
  try{
  const existingPayment = await prismaClient.payment.findUnique({
    where: { reference: paymentData.paymentRef },
  });

  if(!existingPayment){
    return {
      status: 404,
      message: `Payment with reference ID: ${paymentData.paymentRef} not found`,
    };
  }

  if(existingPayment.status === 'success'){
    return {
      status: 200,
      message: `Payment with reference ID: ${paymentData.paymentRef} has already been verified successfully `,
    };
  }

  if(existingPayment.status === 'failed'){
    return {
      status: 400,
      message: `Payment with reference ID: ${paymentData.paymentRef} failed, please re-initialize `,
    };
  }

  if(existingPayment.amount !== paymentData.amount * 100){
    return {
      status: 400,
      message: `Payment with reference ID: ${paymentData.paymentRef} can't be verified, check the payment details `,
    };
  }

  const response = await verifyPaystack(paymentData.paymentRef);
  
  if(response.data.status !=='success'){
    return {
      status: 400,
      message: response.data.message,
      data:response.data
    };
  }
 
  await prismaClient.payment.update({
    where: { id: existingPayment.id }, 
    data: {
      status: 'success',
      updated_at: response.data.created_at,
      payment_full_details: JSON.parse(response.data)
    }
  });
  return {
    status: 201,
    message: "Payment verified successfully!",
    data: response.data,
  };
}
catch (error) {
  return {
    status: 500,
    message: error,
  };
}
}


