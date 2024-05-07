require('dotenv').config();
const express = require("express");
const ShortUrl = require("./models/shortUrl");
const user = require("./controllers/users");
const auth = require('./controllers/auth');
const connection = require("./db");
const shortUrl = require("./controllers/urls");

//middlewares
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/api/user", user);
app.use('/api/auth', auth)
app.use("/shortUrl", shortUrl);

app.get('/login', (req,res) => {
  res.render('login')
})

app.get('/signup', (req,res) => {
  res.render('signup')
})



const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`server is running on ${port}`));
