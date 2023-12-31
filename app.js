const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const usersRouter = require("./routes/users");
const pointsRouter = require("./routes/points");

const swaggerDocument = require("./swagger.json");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // с этим поработать

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", usersRouter);
app.use("/points", pointsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;