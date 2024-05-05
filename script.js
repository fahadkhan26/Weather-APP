// let city = document.getElementById("city")

let searchBtn = document.querySelector(".searchButton");




let card = document.querySelector(".maincard-container")

// const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city.value;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17c37d8decmsh929c88a82984389p12b4cajsn1d9837d5e0c4",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};



let state = (result) => {
  if ((result.cloud_pct >= 0) & (result.cloud_pct < 10)) {
    return "Mostly Sunny";
  } else if ((result.cloud_pct >= 10) & (result.cloud_pct < 30)) {
    return "Partly Cloudy";
  } else if ((result.cloud_pct >= 30)) {
    return "Mostly Cloudy";
  }
}



let weather = async () => {
  try {
    const response = await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city.value, options);
    const result = await response.json();
    console.log(result);
    

    if ((result.cloud_pct >= 0) & (result.cloud_pct < 10)) {
      card.style.backgroundImage = "url('sunny.jpg')";
      card.style.backgroundSize = "cover";
    } else if ((result.cloud_pct >= 10) & (result.cloud_pct < 30)) {
      card.style.backgroundImage = "url('partly cloudy.jpg')";
      card.style.backgroundSize = "cover";
    } else if ((result.cloud_pct >= 30)) {
      card.style.backgroundImage = "url('cloudy.jpg')";
      card.style.backgroundSize = "cover";
    }

    let cardHTML = `<div class="maincard-container">
    <div class="weather-header">
      <h2>WEATHER REPORT</h2>
    </div>
    <div class="weather-stats">
        <p class="weather-location">${city.value}</p>
        <h2 class="temp">${result.temp}&degC</h2>
        <p class="weather-state">${state(result)}</p>
      </div>
      <div class="others">
          <div class="feels-like">Feels Like: ${result.feels_like}&degC </div>
          <div class="cloud-pct">Cloud Percentage: ${result.cloud_pct}% </div>
          <div class="humidity">Humidity: ${result.humidity}%</div>
          <div class="wind-speed">Wind Speed: ${result.wind_speed}km/h</div>
        </div>
    </div>`

    card.style.backgroundColor = "transparent";
    card.innerHTML = cardHTML

  } catch (error) {
    card.style.backgroundColor = "rgb(210, 210, 210)";
    cardHTML = `<div class="maincard-container">
    <div class="weather-header">
      <h2>WEATHER REPORT</h2>
    </div>
    <div class="weather-stats">
        <p class="weather-location">${city.value}</p>
        <h2 class="temp">$0&degC</h2>
        <p class="weather-state">$0</p>
      </div>
      <div class="others">
          <div class="feels-like">Feels Like: $0&degC </div>
          <div class="cloud-pct">Cloud Percentage: $0% </div>
          <div class="humidity">Humidity: $0%</div>
          <div class="wind-speed">Wind Speed: $0km/h</div>
        </div>
    </div>`

    card.innerHTML = cardHTML
    
    console.error(error);
  }
};




searchBtn.addEventListener("click" , () => {
  weather()
})


document.body.addEventListener("keypress" , (event) => {
  if (event.key === "Enter"){
    weather()
  }
})
