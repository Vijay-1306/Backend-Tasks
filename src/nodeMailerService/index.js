const { func } = require("joi");
const nodeMailer = require("nodemailer");

//Mail Service Create

const mail = async function (mailOption) {
  const mailTransport = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailDetails = {
    from: process.env.EMAIL_USER,
    ...mailOption,
  };

  console.log(mailDetails, "MailDetails---------->");
  try {
    const finalEmail = await mailTransport.sendMail(mailDetails);

    console.log(finalEmail, "finalEmail----->");
    return { status: 200, response: finalEmail.response };
  } catch (error) {
    return { error: error, status: 500 };
  }
};

module.exports = {
  sendMail: mail,
};
