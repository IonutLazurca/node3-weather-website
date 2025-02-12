const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/retrieveForecast')
const coordinates = require('./utils/retrieveCoordinates')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }   
    coordinates.retrieveCoordinates(req.query.search, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            console.log(error)
        }
        forecast.retrieveForecast(latitude, longitude, (error, {location, forecast} = {}) => {
            if (error) {
                console.log(error)
            }
            res.send({
                location: location,
                forecast: forecast
            })
            var text = ''
            for(x in forecast) {
                text += x + ': ' + forecast[x] + ', '
            }
            console.log(text)

            var myArray = Object.values(forecast)            

            var myString = JSON.stringify(forecast)            

        })
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

const url = 'http://localhost:' + port


app.listen(port, () => {
    console.log('Server is up on port ' + port + ' at the following address: ', url)
})