const cors = require("cors");
const config = require("config");
const stripeSecretKey = process.env.stripeSecretKey;
const stripe = require("stripe")(stripeSecretKey);
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect database
connectDB();

app.use(cors());

//init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("api running"));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/event", require("./routes/api/event"));
app.use("/api/email", require("./routes/api/email"));
app.use("/api/profiles", require("./routes/api/profiles"));

//deployment
app.use(express.static(path.resolve(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/build", "index.html"));
});

//stripe payment

app.get("/credit", (req, res) => {
  console.log("credit");
  res.send("credit");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

// //nodemailer

// app.post("/forgot-password", async (req, res) => {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "phantomassasin2008@gmail.com",
//       pass: gmailAppPassword,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   let message = {
//     from: ' "sweet & tasty academy", <sweetntasty@mail.com>',
//     to: ` User of sweet & Tasty Academy, <${req.params.email}>`,
//     subject: "Reset Password",
//     html: `<p>please following this link to reset your password <a href="https://localhost3000/reset-password/${req.params.ID}">https://localhost3000/reset-password/${req.params.ID}</a></p>`,
//   };

//   transporter.sendMail(message, (error, info) => {
//     if (error) {
//       console.log("Error occurred");
//       console.log(error.message);
//       return process.exit(1);
//     }

//     console.log("Message sent successfully!");
//     console.log(nodemailer.getTestMessageUrl(info));
//     res.send("successfully sent");
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
