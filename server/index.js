const express = require("express");
const cors = require("cors");
require("./config/passport");
const apiRouter = require("./routers/routers");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

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

app.use(passport.initialize());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(cors(origin));

app.use(apiRouter);

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5010;

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
