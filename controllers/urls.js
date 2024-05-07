const express = require('express');
const { ShortUrl }  = require('../models/shortUrl');
const _=require('lodash');
const auth = require('../middleware/auth');
const router = express.Router()


// getting all shortUlsr stored in DB
router.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

//posting a new shortUrl into a DB
router.post("/", auth,async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");

  // POSTMAN TESTING

  // const url = new ShortUrl(_.pick(req.body, ['full']))
  // const result = await url.save()
  // res.send(result)

});

router.get("/:shortUrl", async (req, res) => {
  const shortUrlData = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrlData == null) return res.status(404).send('');

  shortUrlData.clicks++;
  shortUrlData.save();

  res.redirect(shortUrlData.full);
});

module.exports = router