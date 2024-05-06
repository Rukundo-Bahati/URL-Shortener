const express = require("express");
const ShortUrl = require("./models/shortUrl");
const user = require('./controllers/users');
const connection = require('./db');
const shortUrl = require('./controllers/urls');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use('/user', user)
app.use('/shortUrl', shortUrl)

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`server is running on ${port}`));
