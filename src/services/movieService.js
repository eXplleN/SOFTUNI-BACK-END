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
    getOneWithCasts(movieId){
       return this.getMovie(movieId).populate('casts');
    },
    create(movieData, creatorId) {
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;
    },
    attachCast(movieId, castId){
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    },
    delete(movieId) {
       return Movie.findByIdAndDelete(movieId);
    }
}