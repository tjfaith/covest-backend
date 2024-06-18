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
export { updateUserService,userData, getAllUsersService } from "@/services/userServices";


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


// util services
export { generateUniqueId, generateJwtToken, verifyJWT, generatePassword } from "@/services/utilsServices";

// external services
// ---paystack
export {initializePaystack, verifyPaystack} from '@/services/externalServices/paystack'
export {uploadImage, deleteImage} from '@/services/externalServices/imagekit'