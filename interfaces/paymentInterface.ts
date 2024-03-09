export interface InitializePayment {
  amount: number;
  email: string;
  userId: string;
  propertyId: string;
}

export interface VerifyPayment {
  paymentRef: string;
  amount: number;
}

export interface InitializeBankTransfer{
    property_id: string;
    user_id: string;
    paymentRef: string;
    amount: string;
    file: Express.Multer.File | undefined;
}

export interface VerifyBankTransfer{
  payment_id:string;
  property_id: string;
  payee_id: string;
  paymentProfID: string;
  amount: number;
  paymentRef: string;
  validator_id:string;
}