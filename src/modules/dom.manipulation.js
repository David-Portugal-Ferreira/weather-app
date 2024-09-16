import "./dom-manipulation.css";
import { fetchWeatherInfo } from "./weather-api";

const weatherData = await fetchWeatherInfo();

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

Object.keys(elements).forEach( (element) => {
  elements[element].forEach( (test, testIndex) => {
    test.innerText = `${element}: ${weatherData.days[testIndex][element]}`;
  })
});

/* function constructCard(
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

function clearInfoFromDivs() {
  resolvedAddress.replaceChildren();
  timezone.replaceChildren();
  fiveDaysWeather.replaceChildren();
}

function uvIndexColor(uvIndexValue) {
  if (uvIndexValue <= 2) return "low-uv-index";
  if (uvIndexValue >= 3 && uvIndexValue <= 5) return "moderate-uv-index";
  if (uvIndexValue >= 6 && uvIndexValue <= 7) return "high-uv-index";
  if (uvIndexValue >= 8 && uvIndexValue <= 10) return "veryhigh-uv-index";
  if (uvIndexValue >= 11) return "extreme-uv-index";
}

export {};
