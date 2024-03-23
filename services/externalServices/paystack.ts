import instance from "./api";

export const initializePaystack =async(paymentPayload:Record<string , string | number>)=>{
    return await instance(process.env.PAYSTACK_BASE_URL as string).post(
        '/transaction/initialize',
        {
          amount:paymentPayload.amount,
          email: paymentPayload.email,
          billName: paymentPayload.userId,
        },
        {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "content-type": "application/json",
            "cache-control": "no-cache",
          },
        }
      );
}


export const verifyPaystack = async (paymentRef: string) => {
    try {
      const response = await instance(process.env.PAYSTACK_BASE_URL as string).get(
        `/transaction/verify/${paymentRef}`,
        {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "content-type": "application/json",
            "cache-control": "no-cache",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  };