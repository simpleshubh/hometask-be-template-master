const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const errorHandler = require('./middleware/errorHandler');
const AppError = require("./exception/appError");
const ERROR_MESSAGE = require("./constant/error");
const routes = require("./routes/routes");

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('/', routes);
app.use(errorHandler);

process.on("uncaughtException", (err) => {
    throw new AppError(500, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
});

process.on("unhandledException", (err) => {
    throw new AppError(500, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
});

module.exports = app;
