import "./index.css"
import * as weather from "./modules/weather-api.js"
import * as dom from "./modules/dom.manipulation.js"
import * as form from "./modules/form-handler.js"

// const tempo = await weather.fetchWeatherInfo();

dom.resolvedAddress.innerText = tempo.resolvedAddress;
dom.timezone.innerText = tempo.timezone;

for (let i = 0; i < 5; i++) {
    dom.constructCard(
        tempo.days[i].conditions,
        tempo.days[i].datetime,
        tempo.days[i].description,
        tempo.days[i].temp,
        tempo.days[i].tempmax,
        tempo.days[i].tempmin,
        tempo.days[i].uvindex,
        tempo.days[i].windspeed,
        tempo.days[i].winddir
    )
}