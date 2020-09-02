console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading data ...'
    messageTwo.textContent = 'Loading weather forecast ...'
    messageThree.textContent = 'Loading weather forecast ...'
       
    fetch('/weather?search=' + search.value).then((response) => {
    response.json().then((data) => {        
        if(data.error) {
            messageOne.textContent = data.error
           
        } else {
            messageOne.textContent = data.location.name
            messageTwo.textContent = data.forecast.temperature
            var text = ''
            for(x in data.forecast) {                
                text += x + ': ' + data.forecast[x] + ', '
            }
            messageThree.textContent = text
            // console.log('Location: ', data.location)
            // console.log('Weather description: ', data.forecast.weather_descriptions)
            // console.log('Temperature: ', data.forecast.temperature)            
        }
    })
})

})

