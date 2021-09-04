const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')

dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))

app.use(express.json())

 app.use('/api/auth', authRoute)


app.listen(5000, () => {
  console.log('Server is running on port 5000')
})