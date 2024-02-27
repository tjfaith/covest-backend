export const confirmForgotPasswordEmail = (payload: Record<string, string>) => {
    return (`
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
    `);
}



export const verifyEmail = (payload: Record<string, string>) => {
    return (`
        <div>
            <div style="display:flex align-items: center;">
            <img src='https://res.cloudinary.com/tjfaith/image/upload/v1707860143/logo_ahnhbz.png' style="width:50px; height:50px;"/>
            <span>COvest</span>
            </div>
            <div>
                Thanks for choosing us, please click on the link below to verify your email
            </div>
            <a href="${process.env.FRONTEND_LINK}/verify_email/${payload.token}">
                <button style="background-color: #4B4B4B;
                color: #E4E8EB;
                text-align: center;
                padding: 0.5rem;
                border-radius: 0.5rem;
                margin-top:5px;
                ">Verify Account</button>
            </a>
        </div>
    `);
}
