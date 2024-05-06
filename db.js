const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected Successfully'))
  .catch(err => console.error('Connection Error:', err));
