let express = require("express");
let router = express.Router();

const names = [{ name: "John" }, { name: "Dan", name: "Joe" }];
/* GET home page. */
router.get("/", function (req, res) {
  // res.render("index", { title: "Express" });
  res.json(names);
});

router.get("/login", (req, res) => {
  res.send("this is the login page");
});

router.get("/guest", (req, res) => {
  res.send("this is the guest page");
});
module.exports = router;
