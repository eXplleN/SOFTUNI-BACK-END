import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRatingHelper from './helpers/ratingHelper.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

try {
    const defaultlUri = 'mongodb://localhost:27017/magic-movies-jan2025';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultlUri);
    
    console.log('DB connected successfully!');
    
}catch (err) {
    console.log('Cannot connect to DB!');
    console.error(err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
    } 
}));
 
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
