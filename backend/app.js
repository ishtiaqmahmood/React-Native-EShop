const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// routes
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

// middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// db
mongoose
  .connect(process.env.DATABASE, { dbName: "eshop-database" })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server is running");
});
