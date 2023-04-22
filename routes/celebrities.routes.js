const express = require("express");
const router = express.Router();
const Celebrity = require("./../models/celebrity.model");
const hbs = require("hbs");

// all your routes here

router.get("/", (req, res) => {
  // ruta home
  Celebrity.find()
    .then((celebrities) =>
      res.render("celebrities/celebrities", { celebrities })
    )
    .catch((err) => console.log("You have an error: ", err));
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => console.log("You have an error: ", err));
});

module.exports = router;
