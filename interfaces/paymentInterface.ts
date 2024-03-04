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
