import { Router } from "express";
import movieService from "../services/movieService.js";

const movieContorller = Router();

movieContorller.get('/create', (req, res) => {
    res.render('create');
});

movieContorller.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;

    const movie = movieService.findMovie(movieId);
    res.render('details');
});

export default movieContorller;