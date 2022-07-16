const express = require("express");
const cors = require("cors");
require("./config/passport");
const app = express();
const apiRouter = require("./routers/routers");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const origin = {
  origin: isProduction ? process.env.CORS_ORIGIN : "http://localhost:3000",
  credentials: true,
};

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://checkout.stripe.com"],
      frameSrc: ["'self'", "https://checkout.stripe.com"],
      childSrc: ["'self'", "https://checkout.stripe.com"],
      scriptSrc: ["'self'", "https://checkout.stripe.com"],
      styleSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://checkout.stripe.com",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "https://*.stripe.com", "https://res.cloudinary.com"],
      baseUri: ["'self'"],
    },
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
