const request = require('request')

const retrieveForecast = (latitude, longitude, callback ) => {
  
    const url = 'http://api.weatherstack.com/forecast?access_key=c5630e5d0299632ede72a0fd21164a72&query=' + latitude + ',' + longitude + '&units=m'
    // console.log(url)

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {           
            callback(undefined, {
                location: body.location,
                forecast: body.current               
            })      
        }
    })

}

module.exports = {
    retrieveForecast: retrieveForecast
}

// retrieveForecast(40,-75, (error, res) => {
//     console.log(res)
// })