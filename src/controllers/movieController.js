import { Router } from "express";

const movieContorller = Router();

movieContorller.get('/create', (req, res) => {
    res.render('create');
});

export default movieContorller;