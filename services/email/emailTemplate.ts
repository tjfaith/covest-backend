export const confirmForgotPasswordEmail = (payload: Record<string, string>) => {
  return `
        <div>
            <div style="display:flex; align-items:center;">
                <img src='https://res.cloudinary.com/tjfaith/image/upload/v1707860143/logo_ahnhbz.png' style="width:50px; height:50px;"/>
                <span>COvest</span>
            </div>
            <div>
                You requested to reset your password. If this was not you, please ignore this email.
            </div>
            <a href="${process.env.FRONTEND_LINK}/reset_password/${payload.token}">
                <button style="background-color: #4B4B4B;
                color: #E4E8EB;
                text-align: center;
                padding: 0.5rem;
                border-radius: 0.5rem;
                margin-top:5px;
                ">Reset Password</button>
            </a>
        </div>
    `;
};

export const verifyEmail = (payload: Record<string, string>) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Roboto', sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://res.cloudinary.com/tjfaith/image/upload/v1707860143/logo_ahnhbz.png" alt="COvest Logo" style="width: 50px; height: 50px; margin-right: 10px;">
        <span style="font-weight: bold; font-size: 24px; color: #333;">COvest</span>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; background-color: #fff;">
        <div style="margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px; color: #333;">Hello!</h2>
            <p style="margin: 0; color: #555;">Thanks for choosing us, please click on the link below to verify your email.</p>
        </div>
        <a href="${process.env.FRONTEND_LINK}/verify_email/${payload.token}" style="cursor: pointer"><button style="background-color: green; color: white; border: none; border-radius: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Reset Password</button></a>
        <div style="margin-top: 20px; color: #777;">
            PS: If you did not initiate this request, reply to this email or write to <a href="mailto:help@coovestafrica.com" style="color: #777; text-decoration: none;">help@coovestafrica.com</a> so we can look into a possible attempt to breach your account.
        </div>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #777; font-size: 14px;">
        &copy; COvest Inc <script>document.write(new Date().getFullYear());</script> Modern Payments for Africa
    </div>
</div>
    `;
};

export const emailTemplate = () => {
  ``;
};
