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

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My backyard', description: 'cheap camping' });
    await camp.save();
    res.send(camp)
})
/***** End Rountings ********/

app.listen(3000, () => {
    console.log('APP LISTENING ON PORT 3000');
})