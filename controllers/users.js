const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if(existingUser) return res.status(404).send({message: 'User Already exists in DB'})

  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = new User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  user.password = await bcrypt.hash(req.body.password, salt);
  const token = user.generateAuthToken();
  user.save();
  res.send(token);
});

module.exports = router