const request = require('request')

const forecast = (latitude, longitude, callback ) => {
  
    const url = 'http://api.weatherstack.com/forecast?access_key=c5630e5d0299632ede72a0fd21164a72&query=' + latitude + ',' + longitude + '&units=m'
    // console.log(uri)

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(error, undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const weather_forecast = {
                location: body.location,
                forecast: body.forecast
            }
            callback(undefined, weather_forecast)      
        }
    })

}

module.exports = {
    forecast: forecast
}