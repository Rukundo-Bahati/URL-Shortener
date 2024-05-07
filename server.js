require('dotenv').config();
const express = require("express");
const ShortUrl = require("./models/shortUrl");
const user = require("./controllers/users");
const auth = require('./controllers/auth');
const connection = require("./db");
const shortUrl = require("./controllers/urls");

const app = express();
// if (!config.get("JWTPRIVATEKEY")) {
//   console.log("JWTPRIVATEKEY is not defined");
//   process.exit(1);
// }

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/api/user", user);
app.use('/api/auth', auth)
app.use("/shortUrl", shortUrl);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`server is running on ${port}`));
