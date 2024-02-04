const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRouter = require('./router/User');
dotenv.config();

var user = [
  { email: 'boss@gmail.com', password: 123 },
  { email: 'boss1@gamil.com', password: 123 },
];
app.use(cors());
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/user', UserRouter);

const port = process.env.port;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log(`Datadase connection success`))
  .catch((error) => console.log(`error${error} did not connnect`));

app.listen(port, () => {
  console.log(`Start server at port ${port}`);
  console.log(process.env.port);
});
