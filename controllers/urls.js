const express = require('express');
const { ShortUrl }  = require('../models/shortUrl');
const router = express.Router()


// getting all shortUlsr stored in DB
router.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

//posting a new shortUrl into a DB
router.post("/", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

router.get("/:shortUrl", async (req, res) => {
  const shortUrlData = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrlData == null) return res.status(404).send('');

  shortUrlData.clicks++;
  shortUrlData.save();

  res.redirect(shortUrlData.full);
});

module.exports = router