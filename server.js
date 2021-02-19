const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");


app.use(express.json());

connectDB();


app.use("/api/users", require('./routes/userRoute'));
app.use("/api/cards", require('./routes/cardRoute'));
//app.use("/", require('./routes/uploadPhoto'))



const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err ? console.log("error") : console.log(`server is running on port ${port}`)
);