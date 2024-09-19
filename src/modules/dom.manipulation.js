import "./dom-manipulation.css";
import { fetchWeatherInfo } from "./weather-api";

const form = document.querySelector("form");
const formSearchButton = document.querySelector("button[type=submit]");
const currentSearch = document.querySelector(".current-search");

const contentDiv = document.querySelector(".content");
const daysRowDiv = document.querySelector(".days-row");
const byHour = document.querySelectorAll(".by-hour");

const elements = {
  datetime: document.querySelectorAll(".datetime"),
  conditions: document.querySelectorAll(".conditions"),
  description: document.querySelectorAll(".description"),
  tempmin: document.querySelectorAll(".tempmin"),
  temp: document.querySelectorAll(".temp"),
  tempmax: document.querySelectorAll(".tempmax"),
  uvindex: document.querySelectorAll(".uvindex"),
  precip: document.querySelectorAll(".precip"),
  precipprob: document.querySelectorAll(".precipprob"),
  humidity: document.querySelectorAll(".humidity"),
  windspeed: document.querySelectorAll(".windspeed"),
  winddir: document.querySelectorAll(".winddir"),
  windspeedmax: document.querySelectorAll(".windspeedmax"),
  snow: document.querySelectorAll(".snow"),
  snowdepth: document.querySelectorAll(".snowdepth"),
};

const icons = {
  searchIcon: '<i class="fas fa-search"></i>',
  north: 'N <i class="fa-solid fa-arrow-up"></i>',
  northEast: 'NE <i class="fa-solid fa-arrow-right northeast"></i>',
  east: 'E <i class="fa-solid fa-arrow-right"></i>',
  southEast: 'SE <i class="fa-solid fa-arrow-right southeast"></i>',
  south: 'S <i class="fa-solid fa-arrow-down"></i>',
  southWest: 'SW <i class="fa-solid fa-arrow-right southwest"></i>',
  west: 'W <i class="fa-solid fa-arrow-left"></i>',
  northWest: 'NW <i class="fa-solid fa-arrow-right northwest"></i>',
};

const weekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wendsdays",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

formSearchButton.innerHTML = icons.searchIcon;

async function loadFiveCards(city) {
  const weatherData = await fetchWeatherInfo(city);

  currentSearch.innerText = weatherData.resolvedAddress;

  Object.keys(elements).forEach((element) => {
    // TODO - Change 'test' and 'testIndex' names
    elements[element].forEach((test, testIndex) => {
      if (element === "datetime") {
        convertDayToWeekDay(test, weatherData.days[testIndex][element]);
        return;
      }
      if (element === "winddir") {
        windDirection(test, weatherData.days[testIndex][element]);
        return;
      }
      if (element === "snow" && weatherData.days[testIndex][element] <= 0) {
        removeSnowDiv(testIndex);
        return;
      }
      if (element === "uvindex") {
        test.innerText = weatherData.days[testIndex][element];
        uvIndexColor(test, testIndex, weatherData.days[testIndex][element]);
        return;
      }
      test.innerText = `${weatherData.days[testIndex][element]}`;
    });
  });
}

byHour.forEach((element, index) => {
  element.addEventListener("click", () => {
    weatherByHour(index);
  });
});

function windDirection(test, windDir) {
  if (windDir >= 337.6 || windDir <= 22.5) {
    test.innerHTML = icons.north;
    return;
  }
  if (windDir >= 22.6 && windDir <= 67.5) {
    test.innerHTML = icons.northEast;
    return;
  }
  if (windDir >= 67.6 && windDir <= 112.5) {
    test.innerHTML = icons.east;
    return;
  }
  if (windDir >= 112.6 && windDir <= 157.5) {
    test.innerHTML = icons.southEast;
    return;
  }
  if (windDir >= 157.6 && windDir <= 202.5) {
    test.innerHTML = icons.south;
    return;
  }
  if (windDir >= 202.6 && windDir <= 247.5) {
    test.innerHTML = icons.southWest;
    return;
  }
  if (windDir >= 247.6 && windDir <= 292.5) {
    test.innerHTML = icons.west;
    return;
  }
  if (windDir >= 292.6 && windDir <= 337.5) {
    test.innerHTML = icons.northWest;
    return;
  }
}

function removeSnowDiv(testIndex) {
  const snowCards = document.querySelectorAll(".card-snow");
  snowCards[testIndex].replaceChildren();
}

function convertDayToWeekDay(test, date) {
  let weekDay = new Date(date).getDay();
  test.innerText = weekDays[weekDay];
}

function uvIndexColor(test, testIndex, uvIndexValue) {
  // const uvIndexDiv = document.querySelectorAll(".uvindex-div");
  // let currentUvDiv = uvIndexDiv[test];
  if (uvIndexValue <= 2) test.classList = "low-uv-index";
  if (uvIndexValue >= 3 && uvIndexValue <= 5)
    test.classList = "moderate-uv-index";
  if (uvIndexValue >= 6 && uvIndexValue <= 7) test.classList = "high-uv-index";
  if (uvIndexValue >= 8 && uvIndexValue <= 10)
    test.classList = "veryhigh-uv-index";
  if (uvIndexValue >= 11) test.classList = "extreme-uv-index";
}

function loadingScreen(action) {
  if (action === "start") {
    const loadingDiv = document.createElement("div");
    daysRowDiv.style.display = "none";
    currentSearch.style.display = "none";
    loadingDiv.classList = "loadingscreen";
    loadingDiv.innerHTML = `Loading Data...`;
    contentDiv.appendChild(loadingDiv);
  }
  if (action === "stop") {
    const loadingDiv = document.querySelector(".loadingscreen");
    daysRowDiv.style.display = "flex";
    currentSearch.style.display = "flex";
    contentDiv.removeChild(loadingDiv);
    // loadingDiv.classList = "loadingscreen-stop";
  }
}

function weatherByHour(index) {
  daysRowDiv.style.display = "none";
  createControls();
  const hours = getHours(index);
  hours.map((hour) => {

    const card = document.createElement("div");
    card.classList = "card-by-hours";

    const cardHeader = document.createElement("div");
    cardHeader.classList = "card-header-by-hour";
    const datetime = document.createElement("p");
    datetime.innerText = hour.datetime;
    const conditions = document.createElement("p");
    conditions.innerText = hour.conditions;
    cardHeader.appendChild(datetime);
    cardHeader.appendChild(conditions);


    const cardRain = document.createElement("div");
    cardRain.classList = "card-rain-by-hour";

    const precip = document.createElement("p");
    precip.innerText  = hour.precip;

    const precipProb = document.createElement("p");
    precipProb.innerText  = hour.precipprob;

    const humidity = document.createElement("p");
    humidity.innerText  = hour.humidity;
    
    const pressure = document.createElement("p");
    pressure.innerText  = hour.pressure;

    cardRain.appendChild(precip);
    cardRain.appendChild(precipProb);
    cardRain.appendChild(humidity);
    cardRain.appendChild(pressure);


    const cardSnow = document.createElement("div");
    cardSnow.classList = "card-snow-by-hour";
    const snow = document.createElement("p");
    snow.innerText  = hour.snow;
    const snowDepth = document.createElement("p");
    snowDepth.innerText  = hour.snowdepth;

    cardSnow.appendChild(snow);
    cardSnow.appendChild(snowDepth);


    const cardTemp = document.createElement("div");
    cardTemp.classList = "card-temp-by-hour";
    
    const divTemp = document.createElement("div");
    const spanTemp = document.createElement("span");
    spanTemp.innerText = "Temperature";
    const temp = document.createElement("p");
    temp.innerText  = hour.temp;
    divTemp.appendChild(spanTemp);
    divTemp.appendChild(temp);
    cardTemp.appendChild(divTemp);

    const uvindexDiv = document.createElement("div");
    const uvindexSpan = document.createElement("div");
    uvindexSpan.innerText = "UV Index";
    const uvindex = document.createElement("p");
    uvindex.innerText  = hour.uvindex;
    uvindexDiv.appendChild(uvindexSpan);
    uvindexDiv.appendChild(uvindex);
    cardTemp.appendChild(uvindexDiv);


    const cardWind = document.createElement("div");
    cardWind.classList = "card-wind-by-hour";
    const windDir = document.createElement("p");
    windDir.innerText  = hour.winddir;
    const windSpeed = document.createElement("p");
    windSpeed.innerText  = hour.windspeed;

    cardWind.appendChild(windDir);
    cardWind.appendChild(windSpeed);

    card.appendChild(cardHeader);
    card.appendChild(cardTemp);
    card.appendChild(cardRain);
    card.appendChild(cardSnow);
    card.appendChild(cardWind)
  
    contentDiv.appendChild(card);
  });
}

function getHours(index) {
  const data = JSON.parse(localStorage.getItem("weather"));
  const hours = [];
  const timeNow = parseInt(new Date().valueOf() / 1000);
  data.days[index].hours.forEach((hour) => {
    if (hour.datetimeEpoch >= timeNow) {
      hours.push(hour);
    }
  });
  return hours;
}

function createControls() {
  const divControls = document.createElement("div");
  divControls.classList = "controls";

  const backButton = document.createElement("button");
  backButton.innerText = "Return";
  backButton.addEventListener("click", () => goBack());

  divControls.appendChild(backButton)

  contentDiv.insertBefore(divControls, contentDiv.firstChild);
}

function goBack() {
  const controlsDiv = document.querySelector(".controls");
  const cardsByHour = document.querySelectorAll(".card-by-hours");
  cardsByHour.forEach((element) => contentDiv.removeChild(element));
  contentDiv.removeChild(controlsDiv);
  daysRowDiv.style.display = "flex";
}

export { form, loadFiveCards, loadingScreen };
