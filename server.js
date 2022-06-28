const cors = require("cors");
const stripe = require("stripe")(
  "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"
);
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

//stripe payment

app.get("/credit", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
