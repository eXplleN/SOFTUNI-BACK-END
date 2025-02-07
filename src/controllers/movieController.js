import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieContorller = Router();

movieContorller.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieContorller.get('/create', (req, res) => {
    res.render('create');
});

movieContorller.post('/create', async(req, res) => {
    const newMovie = req.body;
    
   await movieService.create(newMovie);

    res.redirect('/');
});

movieContorller.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);
    
    res.render('movie/details', { movie });
});

movieContorller.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);
    const casts = await castService.getAll()

    res.render('movie/attach-cast', { movie, casts });
});

movieContorller.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`)
});

export default movieContorller;