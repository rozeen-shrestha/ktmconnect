const express = require('express');
const dbConnect = require('./src/database/connect');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
dotenv.config();

const saltRounds = 10;


const app = express();
const port = process.env.PORT || 3000; // Added a default port in case PORT environment variable is not set

// Connect to MongoDB
dbConnect();

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'client', 'provider'],
    default: 'client'
  }
});
const User = mongoose.model('User', userSchema); 

//REGISTER 

app.post('/register', async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
  req.body.password = hashPassword
  console.log(req.body.password)
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log(`An existing user with email ${req.body.email} tried to register.`);
      return res.json({msg: "Email already exists"});
    } else {
      const newUser = await User.create(req.body);
      console.log(newUser);
      res.json({msg: "User registered"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



//LOGIN
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});
  if (user) {
  const isMatched=  await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res.status(401).json({msg:"Invalid credentials"});
    } else {
      const token = jwt.sign({ email: req.body.email }, process.env.KEY, { expiresIn: '1h' });
      res.json({msg: "User Logged in", token});
    }
  }
  else {
    return res.json({msg:`Users with email ${req.body.email} Not Found`});
  }
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: "Internal Server Error"});
  }
});


app.get('/users', async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
