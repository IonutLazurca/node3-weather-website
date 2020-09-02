const request = require('request')

const retrieveLocation = (address, callback ) => {
  
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?&access_token=pk.eyJ1IjoibGF6dXJjYWlvbnV0IiwiYSI6ImNrZTJxZnB2MDBicmcyenBkazl3dXRhdGcifQ.zwTUXAT_7Oc0HXV47x3jlA'   

    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect', undefined)       
      } else if (body.features.length === 0) {
        callback('Unable to find location. Please try another search', undefined)
      } else {
          const coordinates = {
            latitude: body.features[0].geometry.coordinates[1],
            longitude: body.features[0].geometry.coordinates[0],
            place: body.features[0].place_name
          }   
          callback(undefined, coordinates)
      }
    })    
}
module.exports = {
    retrieveLocation: retrieveLocation
}