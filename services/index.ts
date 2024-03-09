// utilsServices

// email services
export { sendMail } from "@/services/email/emailServices";
export {
  verifyEmail,
  adminVerifyEmail,
  confirmForgotPasswordEmail,
  successfulBankTransfer
} from "@/services/email/emailTemplate";

// user services
export { updateUserService, getAllUsersService } from "@/services/userServices";

// payment services
export {
  initializePayment,
  verifyPaymentService,
  initiateBankTransfer,
  verifyTransfer,
} from "@/services/paymentServices";

// auth services
export {
  signUp,
  login,
  googleLogin,
  initiateForgotPassword,
  resetPassword,
  resendUserActivationToken,
  verifyUserEmail,
  updateCurrentPassword,
} from "@/services/authServices";

// admin services 
export { newBootAdmin, newUser, updateUserData,adminLoginService} from "@/services/adminServices";

// property services
export {newProperty, getAllProperties, singleProperty, updateRetailerProperty, deleteSingleProperty} from '@/services/propertyServices'

// util services
export { generateUniqueId, generateJwtToken, verifyJWT, generatePassword } from "@/services/utilsServices";

// external services
// ---paystack
export {initializePaystack, verifyPaystack} from '@/services/externalServices/paystack'
export {uploadImage, deleteImage} from '@/services/externalServices/imagekit'