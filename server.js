const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect database
connectDB();
app.get("/", (req, res) => res.send("api running"));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/event", require("./routes/api/event"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
