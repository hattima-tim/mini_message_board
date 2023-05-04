var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res) => {
  res.render("form", { title: "Message Form" });
});

router.post("/new", (req, res) => {
  const messageText = req.body.message;
  const userName = req.body.userName;
  messages.push({ text: messageText, user: userName, added: new Date() });
  res.redirect("/");
});

module.exports = router;
