const express = require("express");
const databse = require("./src/database/db.config");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
databse.mongoose
  .connect(databse.url, {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send({ messsage: "Hello" });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
