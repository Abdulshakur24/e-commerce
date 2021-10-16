const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routers/routers");

app.use(cors());
app.use(express.json());
app.use(apiRouter);

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
