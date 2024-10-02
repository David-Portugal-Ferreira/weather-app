import "./dom-manipulation.css";
import { fetchWeatherInfo } from "./weather-api";
import { moonPhases, weather } from "./images_manipulation";

const form = document.querySelector("form");
const formSearchButton = document.querySelector("button[type=submit]");
const currentSearch = document.querySelector(".current-search");

const contentDiv = document.querySelector(".content");
const daysRowDiv = document.querySelector(".days-row");
const byHour = document.querySelectorAll(".by-hour");

const elements = {
  datetime: document.querySelectorAll(".datetime"),
  icon: document.querySelectorAll(".icon"),
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

const currentDay = {
  icon: document.querySelectorAll(".current-icon"),
  temp: document.querySelectorAll(".current-temp"),
  tempmin: document.querySelectorAll(".current-tempmin"),
  tempmax: document.querySelectorAll(".current-tempmax"),
  uvindex: document.querySelectorAll(".current-uvindex"),
  precip: document.querySelectorAll(".current-precip"),
  precipprob: document.querySelectorAll(".current-precipprob"),
  humidity: document.querySelectorAll(".current-humidity"),
  windspeed: document.querySelectorAll(".current-windspeed"),
  winddir: document.querySelectorAll(".current-winddir"),
  snow: document.querySelectorAll(".current-snow"),
  snowdepth: document.querySelectorAll(".current-snowdepth"),
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

async function loadCards(city) {
  const weatherData = await fetchWeatherInfo(city);

  loadCurrentWeather(weatherData);
  loadSixDays(weatherData);
}

function loadCurrentWeather(weatherData) {
  Object.keys(currentDay).forEach((element) => {
    currentDay[element].forEach((test) => {
      if (element === "temp" || element === "icon") {
        elementContent(element, test, weatherData.currentConditions[element]);
        return;
      }
      elementContent(element, test, weatherData.days[0][element]);
    });
  });
}

function loadSixDays(weatherData) {
  currentSearch.innerText = weatherData.resolvedAddress;

  Object.keys(elements).forEach((element) => {
    elements[element].forEach((test, index) => {
      elementContent(element, test, weatherData.days[index + 1][element]);
    });
  });
}

function elementContent(weatherElement, htmlElement, weatherData) {
  if (weatherElement === "icon") {
    let icon = weather[weatherData];
    htmlElement.src = icon;
    return;
  }
  if (weatherElement === "winddir") {
    windDirection(htmlElement, weatherData);
    return;
  }
  if (weatherElement === "snow" && weatherData <= 0) {
    removeSnowDiv(htmlElement);
    return;
  }
  if (weatherElement === "uvindex") {
    htmlElement.innerText = weatherData;
    uvIndexColor(htmlElement, weatherData);
    return;
  }
  if (weatherElement === "datetime") {
    convertDayToWeekDay(htmlElement, weatherData);
    return;
  }
  htmlElement.innerText = weatherData;
  weatherUnit(htmlElement, weatherElement)
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
  testIndex.parentElement.parentElement.style.display = "none";
}

function convertDayToWeekDay(test, date) {
  let weekDay = new Date(date).getDay();
  test.innerText = weekDays[weekDay];
}

function uvIndexColor(test, uvIndexValue) {
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

byHour.forEach((element, index) => {
  element.addEventListener("click", () => {
    moreWeatherInfo(index);
    currentSearch.scrollIntoView();
  });
});

function moreWeatherInfo(index) {
  daysRowDiv.style.display = "none";
  createControls();
  if (index === 0) {
    moreInfo(index, true);
  } else {
    moreInfo(index, false);
  }
}

function moreInfo(index, isToday) {
  const todayWeather = getWeatherLocalStorage(index);

  const infoToday = document.createElement("div");
  infoToday.classList = "info-today-card";

  cardHeader(todayWeather, isToday);
  cardDescription(todayWeather);
  cardTemp(todayWeather);
  cardRain(todayWeather);
  if (todayWeather.day.snow > 0) {
    cardSnow(todayWeather);
  }
  cardWind(todayWeather);
  cardOther(todayWeather);
  weatherByHour(index);

  giveWeatherByHourMargin();
}

function cardHeader(todayWeather, isToday) {
  // Card Header
  if (isToday) {
    const cardHeader = document.createElement("div");
    cardHeader.classList = "temp-card-header";

    const currentTempDiv = document.createElement("div");
    const currentTemp = document.createElement("p");
    currentTemp.classList = "temp-current-temp";
    currentTemp.innerText = todayWeather.current.temp;
    weatherUnit(currentTemp, "temp");
    currentTempDiv.appendChild(currentTemp);

    const currentIconDiv = document.createElement("div");
    const currentIcon = document.createElement("img");
    currentIcon.classList = "temp-current-icon";
    currentIcon.src = weather[todayWeather.current.icon];
    currentIconDiv.appendChild(currentIcon);

    cardHeader.appendChild(currentTempDiv);
    cardHeader.appendChild(currentIconDiv);

    contentDiv.appendChild(cardHeader);
  } else {
    const cardHeader = document.createElement("div");
    cardHeader.classList = "temp-card-header";

    const currentTempDiv = document.createElement("div");
    const currentTemp = document.createElement("p");
    currentTemp.classList = "temp-current-temp";
    convertDayToWeekDay(currentTemp, todayWeather.day.datetime);
    currentTempDiv.appendChild(currentTemp);

    const currentIconDiv = document.createElement("div");
    const currentIcon = document.createElement("img");
    currentIcon.classList = "temp-current-icon";
    currentIcon.src = weather[todayWeather.day.icon];
    currentIconDiv.appendChild(currentIcon);

    cardHeader.appendChild(currentTempDiv);
    cardHeader.appendChild(currentIconDiv);

    contentDiv.appendChild(cardHeader);
  }

}

function cardDescription(todayWeather) {
  const cardBody = document.createElement("div");
  cardBody.classList = "descrip-card-body";

  // Temperature Info
  const rainInfo = document.createElement("div");
  rainInfo.classList = "descrip-info";

  // Today header
  const descriptionHeader = document.createElement("div");
  descriptionHeader.classList = "descrip-header";

  const descriptionHeaderTitle = document.createElement("h2");
  descriptionHeaderTitle.innerText = "Description";
  descriptionHeader.appendChild(descriptionHeaderTitle);

  const descriptionInfoContent = document.createElement("div");
  descriptionInfoContent.classList = "descript-info-content";

  const description = document.createElement("p");
  description.innerText = todayWeather.day.description;
  descriptionInfoContent.appendChild(description);

  cardBody.appendChild(descriptionHeader);
  cardBody.appendChild(descriptionInfoContent);
  contentDiv.appendChild(cardBody);
}

function cardTemp(todayWeather) {
  // Card Body
  const cardBody = document.createElement("div");
  cardBody.classList = "temp-card-body";

  // Temperature Info
  const tempInfo = document.createElement("div");
  tempInfo.classList = "temp-info";

  // Today header
  const tempHeader = document.createElement("div");
  tempHeader.classList = "temp-header";

  const tempHeaderTitle = document.createElement("h2");
  tempHeaderTitle.innerText = "Temperature";

  tempHeader.appendChild(tempHeaderTitle);
  tempInfo.appendChild(tempHeader);

  const tempInfoContent = document.createElement("div");
  tempInfoContent.classList = "temp-info-content";

  const tempminDiv = document.createElement("div");
  const tempminSpan = document.createElement("span");
  tempminSpan.innerText = "Min";
  const tempmin = document.createElement("p");
  tempmin.innerText = todayWeather.day.tempmin;
  weatherUnit(tempmin, "tempmin");
  tempminDiv.appendChild(tempminSpan);
  tempminDiv.appendChild(tempmin);
  tempInfoContent.appendChild(tempminDiv);

  const tempDiv = document.createElement("div");
  const tempSpan = document.createElement("span");
  tempSpan.innerText = "Med";
  const temp = document.createElement("p");
  temp.innerText = todayWeather.day.temp;
  weatherUnit(temp, "temp");
  tempDiv.appendChild(tempSpan);
  tempDiv.appendChild(temp);
  tempInfoContent.appendChild(tempDiv);

  const tempmaxDiv = document.createElement("div");
  const tempmaxSpan = document.createElement("span");
  tempmaxSpan.innerText = "Max";
  const tempmax = document.createElement("p");
  tempmax.innerText = todayWeather.day.tempmax;
  weatherUnit(tempmax, "tempmax");
  tempmaxDiv.appendChild(tempmaxSpan);
  tempmaxDiv.appendChild(tempmax);
  tempInfoContent.appendChild(tempmaxDiv);

  const uvindexDiv = document.createElement("div");
  const uvindexSpan = document.createElement("span");
  uvindexSpan.innerText = "UV Index";
  const uvindex = document.createElement("p");
  uvindex.innerText = todayWeather.day.uvindex;
  uvIndexColor(uvindex, todayWeather.day.uvindex);
  uvindexDiv.appendChild(uvindexSpan);
  uvindexDiv.appendChild(uvindex);
  tempInfoContent.appendChild(uvindexDiv);

  tempInfo.appendChild(tempInfoContent);
  cardBody.appendChild(tempInfo);
  contentDiv.appendChild(cardBody);
}

function cardRain(todayWeather) {
  // Today Card Body
  const cardBody = document.createElement("div");
  cardBody.classList = "rain-card-body";

  // Temperature Info
  const rainInfo = document.createElement("div");
  rainInfo.classList = "rain-info";

  // Today header
  const rainHeader = document.createElement("div");
  rainHeader.classList = "rain-header";

  const rainHeaderTitle = document.createElement("h2");
  rainHeaderTitle.innerText = "Rain";

  rainHeader.appendChild(rainHeaderTitle);
  rainInfo.appendChild(rainHeader);

  const rainInfoContent = document.createElement("div");
  rainInfoContent.classList = "rain-info-content";

  const precipDiv = document.createElement("div");
  const precipSpan = document.createElement("span");
  precipSpan.innerText = "Precipitation";
  const precip = document.createElement("p");
  precip.innerText = todayWeather.day.precip;
  weatherUnit(precip, "precip");
  precipDiv.appendChild(precipSpan);
  precipDiv.appendChild(precip);
  rainInfoContent.appendChild(precipDiv);

  const precipProbDiv = document.createElement("div");
  const precipProbSpan = document.createElement("span");
  precipProbSpan.innerText = "Probability";
  const precipProb = document.createElement("p");
  precipProb.innerText = todayWeather.day.precipprob;
  weatherUnit(precipProb, "precipprob");
  precipProbDiv.appendChild(precipProbSpan);
  precipProbDiv.appendChild(precipProb);
  rainInfoContent.appendChild(precipProbDiv);

  const humidityDiv = document.createElement("div");
  const humiditySpan = document.createElement("span");
  humiditySpan.innerText = "Humidity";
  const humidity = document.createElement("p");
  humidity.innerText = todayWeather.day.humidity;
  weatherUnit(humidity, "humidity");
  humidityDiv.appendChild(humiditySpan);
  humidityDiv.appendChild(humidity);
  rainInfoContent.appendChild(humidityDiv);

  const cloudcoverDiv = document.createElement("div");
  const cloudcoverSpan = document.createElement("span");
  cloudcoverSpan.innerText = "Cloud Cover";
  const cloudcover = document.createElement("p");
  cloudcover.innerText = todayWeather.day.cloudcover;
  weatherUnit(cloudcover, "cloudcover");
  cloudcoverDiv.appendChild(cloudcoverSpan);
  cloudcoverDiv.appendChild(cloudcover);
  rainInfoContent.appendChild(cloudcoverDiv);

  const pressureDiv = document.createElement("div");
  const pressureSpan = document.createElement("span");
  pressureSpan.innerText = "Pressure";
  const pressure = document.createElement("p");
  pressure.innerText = todayWeather.day.pressure;
  weatherUnit(pressure, "pressure");
  pressureDiv.appendChild(pressureSpan);
  pressureDiv.appendChild(pressure);
  rainInfoContent.appendChild(pressureDiv);

  rainInfo.appendChild(rainInfoContent);
  cardBody.appendChild(rainInfo);
  contentDiv.appendChild(cardBody);
}

function cardSnow(todayWeather) {
  // Today Card Body
  const cardBody = document.createElement("div");
  cardBody.classList = "snow-card-body";

  // Temperature Info
  const snowInfo = document.createElement("div");
  snowInfo.classList = "snow-info";

  // Today header
  const snowHeader = document.createElement("div");
  snowHeader.classList = "snow-header";

  const snowHeaderTitle = document.createElement("h2");
  snowHeaderTitle.innerText = "Snow";

  snowHeader.appendChild(snowHeaderTitle);
  snowInfo.appendChild(snowHeader);

  const snowInfoContent = document.createElement("div");
  snowInfoContent.classList = "snow-info-content";

  const snowDiv = document.createElement("div");
  const snowSpan = document.createElement("span");
  snowSpan.innerText = "Snow";
  const snow = document.createElement("p");
  snow.innerText = todayWeather.day.snow;
  weatherUnit(snow, "snow");
  snowDiv.appendChild(snowSpan);
  snowDiv.appendChild(snow);
  snowInfoContent.appendChild(snowDiv);

  const snowDepthDiv = document.createElement("div");
  const snowDepthSpan = document.createElement("span");
  snowDepthSpan.innerText = "Snow Depth";
  const snowDepth = document.createElement("p");
  snowDepth.innerText = todayWeather.day.snowdepth;
  weatherUnit(snowDepth, "snowdepth");
  snowDepthDiv.appendChild(snowDepthSpan);
  snowDepthDiv.appendChild(snowDepth);
  snowInfoContent.appendChild(snowDepthDiv);

  snowInfo.appendChild(snowInfoContent);
  cardBody.appendChild(snowInfo);
  contentDiv.appendChild(cardBody);
}

function cardWind(todayWeather) {
  // Today Card Body
  const cardBody = document.createElement("div");
  cardBody.classList = "wind-card-body";

  // Temperature Info
  const windInfo = document.createElement("div");
  windInfo.classList = "wind-info";

  // Today header
  const windHeader = document.createElement("div");
  windHeader.classList = "wind-header";

  const windHeaderTitle = document.createElement("h2");
  windHeaderTitle.innerText = "Wind";

  windHeader.appendChild(windHeaderTitle);
  windInfo.appendChild(windHeader);

  const windInfoContent = document.createElement("div");
  windInfoContent.classList = "wind-info-content";

  const windSpeedDiv = document.createElement("div");
  const windSpeedSpan = document.createElement("span");
  windSpeedSpan.innerText = "Wind Speed";
  const windspeed = document.createElement("p");
  windspeed.innerText = todayWeather.day.windspeed;
  weatherUnit(windspeed, "windspeed");
  windSpeedDiv.appendChild(windSpeedSpan);
  windSpeedDiv.appendChild(windspeed);
  windInfoContent.appendChild(windSpeedDiv);

  const windDirDiv = document.createElement("div");
  const windDirSpan = document.createElement("span");
  windDirSpan.innerText = "Wind Direction";
  const winddir = document.createElement("p");
  windDirection(winddir, todayWeather.day.winddir);
  windDirDiv.appendChild(windDirSpan);
  windDirDiv.appendChild(winddir);
  windInfoContent.appendChild(windDirDiv);

  windInfo.appendChild(windInfoContent);
  cardBody.appendChild(windInfo);
  contentDiv.appendChild(cardBody);
}

function cardOther(todayWeather) {
  // Other Card Body
  const cardBody = document.createElement("div");
  cardBody.classList = "sun-moon-card-body";

  // Other Info
  const otherInfo = document.createElement("div");
  otherInfo.classList = "sun-moon-info";

  // Other Header
  const otherHeader = document.createElement("div");
  otherHeader.classList = "sun-moon-header";

  const otherHeaderTitle = document.createElement("h2");
  otherHeaderTitle.innerText = "Other Info";

  otherHeader.appendChild(otherHeaderTitle);
  otherInfo.appendChild(otherHeader);

  const otherInfoContent = document.createElement("div");
  otherInfoContent.classList = "sun-moon-info-content";

  const sunRiseDiv = document.createElement("div");
  const sunRiseSpan = document.createElement("span");
  sunRiseSpan.innerText = "Sun Rise";
  const sunrise = document.createElement("p");
  sunrise.innerText = todayWeather.day.sunrise;
  sunRiseDiv.appendChild(sunRiseSpan);
  sunRiseDiv.appendChild(sunrise);
  otherInfoContent.appendChild(sunRiseDiv);

  const sunSetDiv = document.createElement("div");
  const sunSetSpan = document.createElement("span");
  sunSetSpan.innerText = "Sun Set";
  const sunset = document.createElement("p");
  sunset.innerText = todayWeather.day.sunset;
  sunSetDiv.appendChild(sunSetSpan);
  sunSetDiv.appendChild(sunset);
  otherInfoContent.appendChild(sunSetDiv);

  const moonPhaseDiv = document.createElement("div");
  const moonPhaseSpan = document.createElement("span");
  moonPhaseSpan.innerText = "Moon Phase";
  const moonPhase = document.createElement("img");
  moonImage(moonPhase, todayWeather.day.moonphase)
  moonPhaseDiv.appendChild(moonPhaseSpan);
  moonPhaseDiv.appendChild(moonPhase);
  otherInfoContent.appendChild(moonPhaseDiv);

  otherInfo.appendChild(otherInfoContent);
  cardBody.appendChild(otherInfo);
  contentDiv.appendChild(cardBody);
}

function weatherByHour(index) {
  const hours = getHours(index);
  hours.map((hour) => {
    const card = document.createElement("div");
    card.classList = "card-by-hours";

    const cardHeader = document.createElement("div");
    cardHeader.classList = "card-header-by-hour";
    const datetime = document.createElement("p");
    datetime.innerText = hour.datetime;
    const conditions = document.createElement("img");
    conditions.src = weather[hour.icon];
    cardHeader.appendChild(datetime);
    cardHeader.appendChild(conditions);
    card.appendChild(cardHeader);

    const cardBody = document.createElement("div");
    cardBody.classList = "card-body";

    const cardTemp = document.createElement("div");
    cardTemp.classList = "card-temp-by-hour";

    const divTemp = document.createElement("div");
    const spanTemp = document.createElement("span");
    spanTemp.innerText = "Temperature";
    const temp = document.createElement("p");
    temp.innerText = hour.temp;
    weatherUnit(temp, "temp");
    divTemp.appendChild(spanTemp);
    divTemp.appendChild(temp);
    cardTemp.appendChild(divTemp);
    cardBody.appendChild(cardTemp);

    const uvindexDiv = document.createElement("div");
    const uvindexSpan = document.createElement("span");
    uvindexSpan.innerText = "UV Index";
    const uvindex = document.createElement("p");
    uvIndexColor(uvindex, hour.uvindex);
    uvindex.innerText = hour.uvindex;
    uvindexDiv.appendChild(uvindexSpan);
    uvindexDiv.appendChild(uvindex);
    cardTemp.appendChild(uvindexDiv);

    const cardRain = document.createElement("div");
    cardRain.classList = "card-rain-by-hour";

    const precipDiv = document.createElement("div");
    const precipSpan = document.createElement("span");
    precipSpan.innerText = "Precip";
    const precip = document.createElement("p");
    precip.innerText = `${hour.precip}`;
    weatherUnit(precip, "precip");
    precipDiv.appendChild(precipSpan);
    precipDiv.appendChild(precip);

    const precipProbDiv = document.createElement("div");
    const precipProbSpan = document.createElement("span");
    precipProbSpan.innerText = "Probability";
    const precipProb = document.createElement("p");
    precipProb.innerText = `${hour.precipprob}`;
    weatherUnit(precipProb, "precipprob");
    precipProbDiv.appendChild(precipProbSpan);
    precipProbDiv.appendChild(precipProb);

    const humidityDiv = document.createElement("div");
    const humiditySpan = document.createElement("span");
    humiditySpan.innerText = "Humidity";
    const humidity = document.createElement("p");
    humidity.innerText = `${hour.humidity}`;
    weatherUnit(humidity, "humidity");
    humidityDiv.appendChild(humiditySpan);
    humidityDiv.appendChild(humidity);

    const pressureDiv = document.createElement("div");
    const pressureSpan = document.createElement("span");
    pressureSpan.innerText = "Pressure";
    const pressure = document.createElement("p");
    pressure.innerText = hour.pressure;
    weatherUnit(pressure, "pressure");
    pressureDiv.appendChild(pressureSpan);
    pressureDiv.appendChild(pressure);

    cardRain.appendChild(precipDiv);
    cardRain.appendChild(precipProbDiv);
    cardRain.appendChild(humidityDiv);
    cardRain.appendChild(pressureDiv);
    cardBody.appendChild(cardRain);

    if (hour.snow > 0) {
      const cardSnow = document.createElement("div");
      cardSnow.classList = "card-snow-by-hour";

      const snowDiv = document.createElement("div");
      const snowSpan = document.createElement("span");
      snowSpan.innerText = "Snow";
      const snow = document.createElement("p");
      snow.innerText = hour.snow;
      weatherUnit(snow, "snow");
      snowDiv.appendChild(snowSpan);
      snowDiv.appendChild(snow);

      const snowDepthDiv = document.createElement("div");
      const snowDepthSpan = document.createElement("span");
      snowDepthSpan.innerText = "Depth";
      const snowDepth = document.createElement("p");
      snowDepth.innerText = hour.snowdepth;
      weatherUnit(snowDepth, "snowdepth");
      snowDepthDiv.appendChild(snowDepthSpan);
      snowDepthDiv.appendChild(snowDepth);

      cardSnow.appendChild(snowDiv);
      cardSnow.appendChild(snowDepthDiv);

      cardBody.appendChild(cardSnow);
    }
    
    const cardWind = document.createElement("div");
    cardWind.classList = "card-wind-by-hour";

    const windDirDiv = document.createElement("div");
    const windDirSpan = document.createElement("span");
    windDirSpan.innerText = "Wind Dir";
    const windDir = document.createElement("p");
    windDirection(windDir, hour.winddir);
    windDirDiv.appendChild(windDirSpan);
    windDirDiv.appendChild(windDir);

    const windSpeedDiv = document.createElement("div");
    const windSpeedSpan = document.createElement("span");
    windSpeedSpan.innerText = "Speed";
    const windSpeed = document.createElement("p");
    windSpeed.innerText = hour.windspeed;
    weatherUnit(windSpeed, "windspeed");
    windSpeedDiv.appendChild(windSpeedSpan);
    windSpeedDiv.appendChild(windSpeed);

    cardWind.appendChild(windDirDiv);
    cardWind.appendChild(windSpeedDiv);
    cardBody.appendChild(cardWind);
    card.appendChild(cardBody);

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

function getWeatherLocalStorage(index) {
  const weather = JSON.parse(localStorage.getItem("weather"));
  if (index === 0) {
    return { day: weather.days[index], current: weather.currentConditions };
  }
  return { day: weather.days[index] };
}

function createControls() {
  const divControls = document.createElement("div");
  divControls.classList = "controls";

  const backButton = document.createElement("button");
  backButton.innerText = "Return";
  backButton.addEventListener("click", () => goBack());

  divControls.appendChild(backButton);

  contentDiv.appendChild(divControls);
}

function goBack() {
  const controlsDiv = document.querySelector(".controls");
  contentDiv.removeChild(controlsDiv);

  try {
    const cardsByHour = document.querySelectorAll(".card-by-hours");
    cardsByHour.forEach((element) => contentDiv.removeChild(element));

    const cardInfo = document.querySelectorAll("[class*='card-body']");
    cardInfo.forEach((elements) => contentDiv.removeChild(elements));

    const cardToday = document.querySelector(".temp-card-header");
    contentDiv.removeChild(cardToday);
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }

  daysRowDiv.style.display = "flex";
}

function giveWeatherByHourMargin() {
  const firstHour = document.querySelector(".card-header-by-hour");
  firstHour.classList.add("first-weather-by-hour");
}

function weatherUnit(htmlElement, type) {
  switch(type) {
    case "temp":
    case "tempmax":
    case "tempmin":
      return htmlElement.innerText += "ºC";
    case "humidity":
    case "precipprob":
    case "cloudcover":
      return htmlElement.innerText += "%";
    case "precip":
      return htmlElement.innerText += " mm";
    case "snow":
    case "snowdepth":
      return htmlElement.innerText += " cm";
    case "windspeed":
      return htmlElement.innerText += " km/h";
    case "pressure":
      return htmlElement.innerText += " mb";
  }
}

function moonImage(htmlElement, moonPhase) {
  if (moonPhase === 0) {
    htmlElement.src = moonPhases.new_moon;
    return
  }
  if (moonPhase >= .01 && moonPhase <= .24) {
    htmlElement.src = moonPhases.waxingCrescent;
    return
  }
  if (moonPhase === 0.25) {
    htmlElement.src = moonPhases.firstQuarter;
    return
  }
  if (moonPhase >= .26 && moonPhase <= .49) {
    htmlElement.src = moonPhases.waxingGibbous;
    return
  }
  if (moonPhase === .50) {
    htmlElement.src = moonPhases.full_moon;
    return
  }
  if (moonPhase >= .51 && moonPhase <= .74) {
    htmlElement.src = moonPhases.waningGibbous;
    return
  }
  if (moonPhase === .75) {
    htmlElement.src = moonPhases.lastQuarter;
    return
  }
  if (moonPhase >= .76) {
    htmlElement.src = moonPhases.waningCrescent;
    return
  }
}

export { form, loadCards, loadingScreen };