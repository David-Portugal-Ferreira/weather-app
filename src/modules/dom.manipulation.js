import "./dom-manipulation.css";
import { fetchWeatherInfo } from "./weather-api";

const form = document.querySelector("form");
const currentSearch = document.querySelector(".current-search");

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
  if (uvIndexValue >= 3 && uvIndexValue <= 5)  test.classList = "moderate-uv-index";
  if (uvIndexValue >= 6 && uvIndexValue <= 7) test.classList = "high-uv-index";
  if (uvIndexValue >= 8 && uvIndexValue <= 10) test.classList = "veryhigh-uv-index";
  if (uvIndexValue >= 11) test.classList = "extreme-uv-index";
}

/*
function constructCard(
  conditionsValue,
  datetimeValue,
  descriptionValue,
  tempValue,
  tempMaxValue,
  tempMinValue,
  uvIndexValue,
  windSpeedValue,
  windDirValue,
) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const conditions = document.createElement("h2");
  conditions.innerText = conditionsValue;
  cardHeader.appendChild(conditions);

  const datetime = document.createElement("h3");
  datetime.innerText = datetimeValue;
  cardHeader.appendChild(datetime);

  const description = document.createElement("p");
  description.innerText = `${descriptionValue}`;

    const temperatureDiv = document.createElement("div");

  const temp = document.createElement("p");
  temp.innerText = `Temp: ${tempValue}°c`;
  temperatureDiv.appendChild(temp);

  const tempMax = document.createElement("p");
  tempMax.innerText = `Max Temp ${tempMaxValue}°c`;
  temperatureDiv.appendChild(tempMax);

  const tempMin = document.createElement("p");
  tempMin.innerText = `Min Temp ${tempMinValue}°c`;
  temperatureDiv.appendChild(tempMin);

  const uvIndex = document.createElement("p");
  uvIndex.innerText = `UV ${uvIndexValue}`;
  uvIndex.classList.add(uvIndexColor(uvIndexValue));

  const windSpeed = document.createElement("p");
  windSpeed.innerText = `Wind speed ${windSpeedValue}`;

  const windDir = document.createElement("p");
  windDir.innerText = `Winde Direction ${windDirValue}`;

  card.appendChild(cardHeader);
  card.appendChild(description);
  card.appendChild(temperatureDiv);
  card.appendChild(uvIndex);
  card.appendChild(windSpeed);
  card.appendChild(windDir);

  fiveDaysWeather.appendChild(card);
} */

export { form, loadFiveCards };
