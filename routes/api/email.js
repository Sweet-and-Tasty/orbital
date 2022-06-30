const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const config = require("config");
const gmailAppPassword = config.get("gmailAppPassword");

//nodemailer

router.post("/", async (req, res) => {
  const { email, ID } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "phantomassasin2008@gmail.com",
      pass: gmailAppPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let message = {
    from: "sweet & tasty academy, <sweetntasty@mail.com>",
    //to: "<hung.hin.wang@gmail.com>",
    to: `${email}`,
    subject: "Reset Password",
    text: "plaintext",
    html: `<p>please following this link to reset your password <a href="http://localhost:3000/reset-password/${ID}">http://localhost:3000/reset-password/${ID}</a></p>`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }

    console.log("Message sent successfully!");
    console.log(nodemailer.getTestMessageUrl(info));
    res.send("successfully sent");
  });
});

module.exports = router;
