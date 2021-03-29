const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Initialize app
const app = express();

//Define paths for Express config
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Set view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set static path
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        creater: 'Debjani'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App-help',
        message: "This a help page for weather app",
        creater: 'Debjani'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Debjani',
        email: 'test@test.com',
        creater: 'Debjani'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "No address provided"
        });
    }
    let address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address
            })
        })
    })
    
});

app.get('*', (req, res) => {
    res.render('404.hbs')
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})