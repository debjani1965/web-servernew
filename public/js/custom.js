const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loadingMsg = document.getElementById('loadingMsg');
const errorMsg = document.getElementById('error');
const locationMsg = document.getElementById('location');
const forecastMsg = document.getElementById('forecast');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationMsg.textContent = '';
    forecastMsg.textContent = '';
    errorMsg.textContent = '';
    loadingMsg.textContent = "loading ....";
    const location = search.value;
    
    fetch('/weather?address="'+ location +'"').then((response) => {
        response.json().then((data) => {
            loadingMsg.textContent = '';
            
            if(data.error) {
                errorMsg.textContent = data.error;
            } else {
                const {location, forecastData} = data;
                console.log(location, forecastData)
                locationMsg.textContent = location;
                forecastMsg.textContent = forecastData;
            }
        })
    });
})