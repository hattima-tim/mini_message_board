const express = require("express");
const Message = require("../models/message");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const messages = await Message.find();
    res.render("index", { title: "Mini Messageboard", messages: messages });
  } catch (err) {
    next(err);
  }
});

router.get("/new", (req, res) => {
  res.render("form", { title: "Message Form" });
});

router.post("/new", async (req, res, next) => {
  try {
    const messageText = req.body.message;
    const userName = req.body.userName;

    await Message.create({
      text: messageText,
      user: userName,
      added: new Date(),
    });

    res.redirect("/");
  } catch (err) {
    const errorString = "Message validation failed";
    const isValidationError = err.message.includes(errorString);
    
    if(isValidationError){
      res.send('<p>Please fill all form fields.</p>')
    }else{
      next(err);
    }
  }
});

module.exports = router;
