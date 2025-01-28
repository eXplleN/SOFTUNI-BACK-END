import { Router } from "express";

const movieContorller = Router();

movieContorller.get('/create', (req, res) => {
    res.render('create');
});

movieContorller.get('/:movieId/details', (req, res) => {
    res.render('details');
});

export default movieContorller;