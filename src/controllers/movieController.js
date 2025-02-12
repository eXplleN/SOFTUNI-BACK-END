import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieContorller = Router();

movieContorller.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieContorller.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieContorller.post('/create', isAuth, async(req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;
     
   await movieService.create(newMovie, userId);

    res.redirect('/');
});

movieContorller.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneWithCasts(movieId);

    const isCreator = movie.creator?.equals(req.user?.id);
    
    res.render('movie/details', { movie, isCreator });
});

movieContorller.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId); 
    const casts = await castService.getAll({ exclude: movie.casts});

    res.render('movie/attach-cast', { movie, casts });
});

movieContorller.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`)
});

movieContorller.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovie(movieId);
    if(!movie.creator?.equals(req.user?.id)) {
        return res.redirect('/404');
    }

   await movieService.delete(movieId);

   res.redirect('/');
    
});

movieContorller.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);

    res.render('movie/edit', { movie });
});

movieContorller.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/`)

});

export default movieContorller;