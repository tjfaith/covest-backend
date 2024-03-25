export const confirmForgotPasswordEmail = (payload: Record<string, string>) => {
  return `

  <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Roboto', sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://ik.imagekit.io/o59kpgo8iz/COvest/logo.png?updatedAt=1709921490645" alt="COvest Logo" style="width: 50px; height: 50px; margin-right: 10px;">
        <span style="font-weight: bold; font-size: 24px; color: #333;">COvest</span>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; background-color: #fff;">
        <div style="margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px; color: #333;">Hello!</h2>
            <p style="margin: 0; color: #555;">You requested to reset your password.</p>
        </div>
        <a href="${process.env.FRONTEND_LINK}/forgottenPassword/${payload.token}" style="cursor: pointer">
        <button style="background-color: green; color: white; border: none; border-radius: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Reset Password</button></a>
        <p> or you can copy this link, past it in your browser's search bar</p>
        <div>${process.env.FRONTEND_LINK}/forgottenPassword/${payload.token}</div>
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

export const verifyEmail = (payload: Record<string, string>) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Roboto', sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://ik.imagekit.io/o59kpgo8iz/COvest/logo.png?updatedAt=1709921490645" alt="COvest Logo" style="width: 50px; height: 50px; margin-right: 10px;">
        <span style="font-weight: bold; font-size: 24px; color: #333;">COvest</span>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; background-color: #fff;">
        <div style="margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px; color: #333;">Hello!</h2>
            <p style="margin: 0; color: #555;">Thanks for choosing us, please click on the link below to verify your email.</p>
        </div>
        <a href="${process.env.FRONTEND_LINK}/verifyEmail/${payload.token}" style="cursor: pointer"><button style="background-color: green; color: white; border: none; border-radius: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Verify Email</button></a>
        <p> or you can copy this link, past it in your browser's search bar</p>
        <div>${process.env.FRONTEND_LINK}/verifyEmail/${payload.token}</div>
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


export const adminVerifyEmail = (payload: Record<string, string>) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Roboto', sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://ik.imagekit.io/o59kpgo8iz/COvest/logo.png?updatedAt=1709921490645" alt="COvest Logo" style="width: 50px; height: 50px; margin-right: 10px;">
          <span style="font-weight: bold; font-size: 24px; color: #333;">COvest</span>
      </div>
      <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; background-color: #fff;">
          <div style="margin-bottom: 20px;">
              <h2 style="margin: 0 0 10px; color: #333;">${payload.heading}</h2>
              <p style="margin: 0; color: #555;">
             ${payload.body}
              </p>
          </div>
          <a href="${process.env.FRONTEND_LINK}/verifyEmail/${payload.token}" style="cursor: pointer"><button style="background-color: green; color: white; border: none; border-radius: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Verify Email</button></a>
          <p> or you can copy this link, past it in your browser's search bar</p>
          <div>${process.env.FRONTEND_LINK}/verifyEmail/${payload.token}</div>
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


  export const successfulBankTransfer = (payload: Record<string, string | number>) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Roboto', sans-serif; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://ik.imagekit.io/o59kpgo8iz/COvest/logo.png?updatedAt=1709921490645" alt="COvest Logo" style="width: 50px; height: 50px; margin-right: 10px;">
          <span style="font-weight: bold; font-size: 24px; color: #333;">COvest</span>
      </div>
      <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; background-color: #fff;">
          <div style="margin-bottom: 20px;">
              <h2 style="margin: 0 0 10px; color: #333;">Bank Transfer Successful</h2>
              <div style="margin: 0; color: #555;">
              Your bank transfer of ${payload.amount} to:
              <ul style="list-style-type: none; padding: 0;">
                  <li><strong>Bank Name:</strong> ${payload.bankName}</li>
                  <li><strong>Account Name:</strong> ${payload.accountName}</li>
                  <li><strong>Account Number:</strong> ${payload.accountNumber}</li>
              </ul>
              has been successfully processed. However, the record is currently pending verification by our admin team.
          </div>
          </div>
          <div style="margin-top: 20px; color: #777;">
              Please be patient as our team verifies your transaction. If you have any questions or concerns, feel free to reach out to us at <a href="mailto:help@coovestafrica.com" style="color: #777; text-decoration: none;">help@coovestafrica.com</a>.
          </div>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #777; font-size: 14px;">
          &copy; COvest Inc <script>document.write(new Date().getFullYear());</script> Modern Payments for Africa
      </div>
  </div>
      `;
};

