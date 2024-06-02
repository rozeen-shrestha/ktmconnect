const express = require('express')
const dbConnect = require('./src/database/connect')
dbConnect()
const app = express()
require('dotenv').config()

app.use(express.json())

const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'client', 'provider'],
    default: 'client'
  }
});


const users = mongoose.model('users', userSchema);
const port = process.env.PORT


app.post('/register', async (req, res) => {
  try {
    const existingUser = await users.findOne({ email: req.body.email });
    if (existingUser) {
      console.log(`An existing user with email ${req.body.email} tried to register.`);
      return res.status(400).send("Email already exists");
      
    } else {
      const newUser = await users.create(req.body);
      console.log(newUser);
      res.send('ok');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get('/users', async (req, res) => {
  const data = await User.find()
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})