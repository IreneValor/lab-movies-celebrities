const Movie = require("../models/movies.model");
const express = require("express");
const router = express.Router();

// Movie Create Get

router.get("/movies", (req, res) => {
  //NO ENTIENDO EL POPULATE
  Movie.find()
    .populate({
      path: "cast",
      select: "-_id name",
    })
    .sort({ title: 1 })
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((err) => console.log(err));
});

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => res.render("movies/new-movie", { celebrities }))
    .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

// Movie Create Post

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body.catch((err) =>
    res.redirect(`/new-movies`)
  );
});

// Movie Detail

router.get("/:movie_id", (req, res) => {
  const { movie_id } = req.params;

  Movie.findById(movie_id)
    // .populate('cast') ???
    .then((movie) => res.render("movies/movie-details", movie))
    .catch((err) => console.log(err));
});

// Movie Delete

router.post("/:movie_id/delete", (req, res) => {
  const { movie_id } = req.params;

  Movie.findByIdAndDelete(movie_id);
});
// Movie Edit Get

router.get("/:movie_id/edit", (req, res) => {
  const { movie_id } = req.params;
  console.log("primero", movie_id);

  Movie.findById(movie_id)
    .then((movie) => res.render("movies/edit-movie", movie))
    .catch((err) => console.log(err));
});

// Movie Edit Post

module.exports = router;
