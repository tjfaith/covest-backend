// utilsServices

// email services
export { sendMail } from "@/services/email/emailServices";
export {
  verifyEmail,
  adminVerifyEmail,
  confirmForgotPasswordEmail,
} from "@/services/email/emailTemplate";

// user services
export { updateUserService, getAllUsersService } from "@/services/userServices";

// payment services
export {
  initializePayment,
  verifyPaymentService,
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
export {newProperty, getAllProperties, singleProperty} from '@/services/propertyServices'

// util services
export { generateUniqueId, generateJwtToken, verifyJWT, generatePassword } from "@/services/utilsServices";

// external services
// ---paystack
export {initializePaystack, verifyPaystack} from '@/services/externalServices/paystack'
export {uploadImage} from '@/services/externalServices/imagekit'