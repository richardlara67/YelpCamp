//required libraries
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground')

//connect to mongo
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//verify connection to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


/***** Start Rountings ********/

// home
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

//look up campground by id
app.get('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})

/***** End Rountings ********/

app.listen(3000, () => {
    console.log('APP LISTENING ON PORT 3000');
})