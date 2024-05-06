const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

const app = express();
mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected Successfully'))
  .catch(err => console.error('Connection Error:', err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// getting all shortUlsr stored in DB
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

//posting a new shortUrl into a DB
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrlData = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrlData == null) return res.status(404).send();

  shortUrlData.clicks++;
  shortUrlData.save();

  res.redirect(shortUrlData.full);
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`server is running on ${port}`));
