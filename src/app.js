const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

const UserRouter = require('./router/User');
const OrderRouter = require('./router/Orders');
const ProductRouter = require('./router/Product');
const BlogRouter = require('./router/Blog');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');

const CustomError = require('./errors');

const errorHandlerMiddleware = require('./middlewares/error-handler');
var user = [
  { email: 'boss@gmail.com', password: 123 },
  { email: 'boss1@gamil.com', password: 123 },
];

// Create Multer instance with the storage configuration

app.use(express.static('./public'));
app.use(cors());

app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use('/blog', BlogRouter);

app.use('/user', UserRouter);

app.use('/orders', OrderRouter);
app.use('/product', ProductRouter);

app.use(errorHandlerMiddleware);

const port = process.env.port;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log(`Datadase connection success`))
  .catch((error) => console.log(`error${error} did not connnect`));

app.listen(port, () => {
  console.log(`Start server at port ${port}`);
  console.log(process.env.port);
});
