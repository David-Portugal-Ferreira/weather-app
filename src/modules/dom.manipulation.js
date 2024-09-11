import "./dom-manipulation.css";
const wrapper = document.querySelector(".wrapper");
const resolvedAddress = document.querySelector(".resolvedAddress");
const timezone = document.querySelector(".timezone");
const fiveDaysWeather = document.querySelector(".five-days-weather");

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
  cardHeader.classList.add("card-header")

  const conditions = document.createElement("h2");
  conditions.innerText = conditionsValue;
  cardHeader.appendChild(conditions);

  const datetime = document.createElement("h3");
  datetime.innerText = datetimeValue;
  cardHeader.appendChild(datetime);

  const description = document.createElement("p");
  description.innerText = `${descriptionValue}`;

  const temp = document.createElement("p");
  temp.innerText = `Temp: ${tempValue}°c`;

  const tempMax = document.createElement("p");
  tempMax.innerText = `Max Temp ${tempMaxValue}°c`;

  const tempMin = document.createElement("p");
  tempMin.innerText = `Min Temp ${tempMinValue}°c`;

  const uvIndex = document.createElement("p");
  uvIndex.innerText = `UV ${uvIndexValue}`;

  const windSpeed = document.createElement("p");
  windSpeed.innerText = `Wind speed ${windSpeedValue}`;

  const windDir = document.createElement("p");
  windDir.innerText = `Winde Direction ${windDirValue}`;

  card.appendChild(cardHeader);
  card.appendChild(description);
  card.appendChild(temp);
  card.appendChild(tempMax);
  card.appendChild(tempMin);
  card.appendChild(uvIndex);
  card.appendChild(windSpeed);
  card.appendChild(windDir);

  fiveDaysWeather.appendChild(card);
}

function clearInfoFromDivs() {
    resolvedAddress.replaceChildren();
    timezone.replaceChildren();
    fiveDaysWeather.replaceChildren();
}

export { resolvedAddress, timezone, constructCard, clearInfoFromDivs };
