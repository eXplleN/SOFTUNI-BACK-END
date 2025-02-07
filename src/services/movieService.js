import Movie from '../models/Movie.js';

export default {
    getAll(filter = {}){
        let query = Movie.find({});

        if (filter.search) {
            query = query.where({ title: filter.search });
        }

        if (filter.genre) {
            query = query.where({ genre: filter.genre });
        }

        if (filter.year) {
            query = query.where({ year: Number(filter.year) });
        }
        return query;
    },
    getMovie(movieId) {
         const result = Movie.findById(movieId);
    
         return result;
    },
    create(movieData) {
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
        });

        return result;
    },
     async attachCast(movieId, castId){
        const movie =  await Movie.findById(movieId);
        movie.casts.push(castId)
        await movie.save();

        return movie;
    }
}