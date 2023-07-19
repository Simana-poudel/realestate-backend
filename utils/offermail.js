var SibApiV3Sdk = require("sib-api-v3-sdk");
const config = require("../config/env");

exports.sendOfferEmailToSeller = async (emailData) => {
  try {
    const { email, url, subject } = emailData;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    sendSmtpEmail = {
      sender: { email: config.getInstance().senderMail },
      to: [{ email: email }],
      subject: `Interested Client`,
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
          <h3> This Email is Send to ${email} from Sellby. </h3>
              <h3> A client is interested in your property. He want to fix a meeting. </h3>
              <h1> Click Here to View details ${url} </h1>
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
