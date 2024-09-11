// QuerySelect HTML elements
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

  const conditions = document.createElement("h2");
  conditions.innerText = conditionsValue;

  const datetime = document.createElement("h3");
  datetime.innerText = datetimeValue;

  const description = document.createElement("p");
  description.innerText = descriptionValue;

  const temp = document.createElement("p");
  temp.innerText = tempValue;

  const tempMax = document.createElement("p");
  tempMax.innerText = tempMaxValue;

  const tempMin = document.createElement("p");
  tempMin.innerText = tempMinValue;

  const uvIndex = document.createElement("p");
  uvIndex.innerText = uvIndexValue;

  const windSpeed = document.createElement("p");
  windSpeed.innerText = windSpeedValue;

  const windDir = document.createElement("p");
  windDir.innerText = windDirValue;

  card.appendChild(conditions);
  card.appendChild(datetime);
  card.appendChild(description);
  card.appendChild(temp);
  card.appendChild(tempMax);
  card.appendChild(tempMin);
  card.appendChild(uvIndex);
  card.appendChild(windSpeed);
  card.appendChild(windDir);

  fiveDaysWeather.appendChild(card);
}

export { resolvedAddress, timezone, constructCard };
