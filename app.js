const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


/***** Start Rountings ********/

// home
app.get('/', (req, res) => {
    res.render('home')
})

/***** End Rountings ********/

app.listen(3000, () => {
    console.log('APP LISTENING ON PORT 3000');
})