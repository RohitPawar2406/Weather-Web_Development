console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
console.log(weatherForm)
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
e.preventDefault()
console.log('Inside IF....')
messageOne.textContent='Loading....'
messageTwo.textContent=''
const location = search.value

fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
    console.log('Inside Fetch 1....')
    response.json().then((data) => {
        console.log('Inside json file....')
        if (data.error) {
            messageOne.textContent=data.error
            //console.log(data.error)
        } else 
        {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        }
    })
})
})
