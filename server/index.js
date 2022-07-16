const express = require("express");
const cors = require("cors");
require("./config/passport");
const app = express();
const apiRouter = require("./routers/routers");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const origin = {
  origin: isProduction ? process.env.CORS_ORIGIN : "http://localhost:3000",
  credentials: true,
};

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Resource-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

app.use(compression());
app.use(express.json({ limit: "50ms" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use(passport.initialize());

app.use(cors(origin));
app.options("*", cors(origin));
app.use(express.json());
app.use(apiRouter);

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
