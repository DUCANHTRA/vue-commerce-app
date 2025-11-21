const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

//Use express.json() middleware to parse JSON requests automatically
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

//Key Idea:
//Router and Middleware Manager
//Does not start the server