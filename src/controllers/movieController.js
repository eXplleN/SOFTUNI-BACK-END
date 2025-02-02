import { Router } from "express";
import movieService from "../services/movieService.js";

const movieContorller = Router();

movieContorller.get('/search', (req, res) => {
    const filter =req.query;
    const movies = movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieContorller.get('/create', (req, res) => {
    res.render('create');
});

movieContorller.post('/create', (req, res) => {
    const newMovie = req.body;
    
    movieService.create(newMovie);

    res.redirect('/');
});

movieContorller.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.findMovie(movieId);
    
    res.render('details', { movie });
});

export default movieContorller;