let searchBar = document.getElementById('search-bar')
let today = document.getElementById('today')
let todayDate = document.getElementById('today-date')
let locationData = document.getElementById('location')
let todayDegree = document.getElementById('today-degree')
let todayIcon = document.getElementById('today-icon')
let descrption = document.getElementById('today-descrption')
let humidty = document.getElementById('humidty')
let wind = document.getElementById('wind')
let compass = document.getElementById('compass')


let nextDay = document.getElementsByClassName('next-day')
let nextDayIcon = document.getElementsByClassName('nextDay-icon')
let maxDegree = document.getElementsByClassName('max-degree')
let minDegree = document.getElementsByClassName('min-degree')
let nextDayDescrption = document.getElementsByClassName('nextDay-descrption')
currenCity = "cairo"
 


let monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Seb', 'Oct', 'Nov', 'Dec']
let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday','Suterday']
  

let date= new Date()

async function getData() {
    console.log(days[date.getDay()]);
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${currenCity}&days=34`)
    responseData = await apiResponse.json()
    displayTodayWeather()
    displayNextDayWeather()
    console.log(responseData)
}



function displayTodayWeather() {
    today.innerHTML=days[date.getDay()]
    todayDate.innerHTML= `${date.getDate()} ${monthsName[date.getMonth()]}`
    locationData.innerHTML=responseData.location.name;
    todayDegree.innerHTML=responseData.current.temp_c;
    todayIcon.setAttribute('src',`https:${responseData.current.condition.icon}`)
    descrption.innerHTML=responseData.current.condition.text;
    wind.innerHTML=responseData.current.wind_degree;
    humidty.innerHTML=responseData.current.humidity;
    compass.innerHTML=responseData.current.wind_dir;

}

function displayNextDayWeather() {
    for (let i = 0; i <nextDay.length; i++) {
       nextDay[i].innerHTML=days[ new Date(responseData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescrption[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text;
    }
}
getData()


searchBar.addEventListener('keyup',function(){
    currenCity=searchBar.value
    console.log(customElements);
    getData(currenCity)
})