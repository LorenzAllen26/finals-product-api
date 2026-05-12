const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(cors());

app.use(express.static(path.join(__dirname)));

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/products", productRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

module.exports = app;
