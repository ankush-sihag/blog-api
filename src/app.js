const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const notFoundMiddleware = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const { apiLimiter, securityMiddleware } = require('./config/security');

const { swaggerUi, swaggerSpec } = require('./config/swagger');

const compression = require('compression');

const app = express();

app.use(express.json());

app.use(apiLimiter);

securityMiddleware.forEach((middleware) => {
    app.use(middleware)
});

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(cookieParser());

app.use(compression());

app.get('/health', (req, res) => {
    res.status(200).json({ sucess: true, message: 'server is healthy'});
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);


module.exports = app;