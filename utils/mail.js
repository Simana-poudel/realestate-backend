var SibApiV3Sdk = require("sib-api-v3-sdk");
const config = require("../config/env");

exports.sendEmailToEmailAddress = async (emailData) => {
  try {
    const { email, otp, subject } = emailData;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    sendSmtpEmail = {
      sender: { email: config.getInstance().senderMail },
      to: [{ email: email }],
      subject: `Sellby`,
      textContent: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sellby</title>
      </head>
      <body>
          <div style="background:gray; padding:2rem;">
              <h3>Email Sent from sellby for buying and selling property </h3>
              <h3> This Email is Send to ${email}  </h3>
              <h1> The OTP code is  ${otp} </h1>
          </div>
      </body>
      </html>
          `,
    };

    const sendingEmailProcess = await apiInstance.sendTransacEmail(
      sendSmtpEmail
    );
    // console.log({sendingEmailProcess})
    if (!sendingEmailProcess) return false;
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

