const app = require('./app');
const connectDB = require('./config/dbConfig');

require("dotenv").config();


connectDB();


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});