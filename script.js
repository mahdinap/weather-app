const cityName = document.getElementById("cityName");
const sender = document.getElementById("sender");
const apiKey = "aeb5e6298f253140a82144c592567f80";
const firstlogo = document.querySelector(".firstMessage");
const notFound = document.querySelector(".notFound");
const weatherinfo = document.querySelector(".weather-info");
const cityname = document.getElementById("city");
const citytemp = document.querySelector(".temp");
const Humidity = document.getElementById("Humidity");
const WindSpeed = document.getElementById("windSpeed");
const currentDate = document.getElementById("currentdate");
const condtion = document.querySelector(".weathercondition");
const weatherImg = document.querySelector(".weatherimg");
const datForecast = document.querySelectorAll(".date-forecast");
const tempForecast = document.querySelectorAll(".temp-forecast");
const forecastImg = document.querySelectorAll(".forecast-img");
let scrollContainer = document.querySelector(".forecast")



sender.addEventListener("click", () => {
  if (cityName.value.trim() != "") {
    weatherInfo(cityName.value);
    forecastgetdata(cityName.value);
    displayForecast(cityName.value);
    cityName.value = "";
    cityName.blur();
    search()
  }
});
cityName.addEventListener("keydown", (event) => {
  if (event.code == "Enter" && cityName.value.trim() != "") {
    weatherInfo(cityName.value);
    forecastgetdata(cityName.value);
    displayForecast(cityName.value);
    cityName.value = "";
    cityName.blur();
    search()
  }
});

const getData = async function (endpoint, city) {
  const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  return response.json();
};
const weatherInfo = async function (city) {
  const weatherData = await getData("weather", city);

  if (weatherData.cod != 200) {
    showDisplayCase(notFound);
    return;
  }
  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  cityname.textContent = country;
  citytemp.textContent = Math.round(temp) + " °C";
  Humidity.textContent = humidity + " %";
  WindSpeed.textContent = speed + " M/S";
  currentDate.textContent = getDate1();
  condtion.textContent = main;
  weatherImg.src = `assets/weather/${getweathericon(id)}`;
  showDisplayCase(weatherinfo);
};

function getDate1() {
  const date = new Date();
  const option = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return date.toLocaleDateString("en-GB", option);
}
function getweathericon(id) {
  if (id <= 232) return "thunderstorm.svg";
  if (id <= 321) return "drizzl.svg";
  if (id <= 531) return "rain.svg";
  if (id <= 622) return "snow.svg";
  if (id <= 781) return "atmosphere.svg";
  if (id === 800) return "clear.svg";
  else return "clouds.svg";
}

function showDisplayCase(section) {
  [weatherinfo, notFound, firstlogo].forEach(
    (section) => (section.style.display = "none")
  );
  section.style.display = "block";
}

async function forecastgetdata(city) {
  const data2 = await getData("forecast", city);
  // console.log(data2);
  const pushman = [];

  for (let i = 0; i < data2.list.length; i += 8) {
    pushman.push(data2.list[i]);
  }
  forecastImg.forEach((element, index) => {
    if (pushman[index] && pushman[index].weather) {
      element.src = `assets/weather/${getweathericon(pushman[index].weather[0].id)}`;
    }
  });
  
  // console.log(pushman);
  return pushman;
}

function getforecasttemp(day) {
  return Math.round(day.main.temp) + " °C";
}

async function displayForecast(city) {
  const forecastData = await forecastgetdata(city);
  tempForecast.forEach((element, i) => {
    element.textContent = `${getforecasttemp(forecastData[i])}`;
  });
}

function getDate(daysAhead = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead); 

  const options = {
    day: "2-digit",
    month: "short",
  };
  return date.toLocaleDateString("en-GB", options);
}
datForecast.forEach((element, i) => {
  element.textContent = `${getDate(i)}`;
});
function search() {
  scrollContainer.scrollLeft = 0; 
}
