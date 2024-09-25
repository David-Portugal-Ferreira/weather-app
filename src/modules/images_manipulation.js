import clearDayImage from "../images/weather/clear-day.svg";
import clearNightImage from "../images/weather/clear-night.svg";
import cloudyImage from "../images/weather/cloudy.svg";
import fogImage from "../images/weather/fog.svg";
import hailImage from "../images/weather/hail.svg";
import partlyCloudyDayImage from "../images/weather/partly-cloudy-day.svg";
import partlyCloudyNightImage from "../images/weather/partly-cloudy-night.svg";
import rainSnowShowersDayImage from "../images/weather/rain-snow-showers-day.svg";
import rainSnowShowersNightImage from "../images/weather/rain-snow-showers-night.svg";
import rainSnowImage from "../images/weather/rain-snow.svg";
import rainImage from "../images/weather/rain.svg";
import showersDayImage from "../images/weather/showers-day.svg";
import showersNightImage from "../images/weather/showers-night.svg";
import sleetImage from "../images/weather/sleet.svg";
import snowShowersDayImage from "../images/weather/snow-showers-day.svg";
import snowShowersNightImage from "../images/weather/snow-showers-night.svg";
import snowImage from "../images/weather/snow.svg";
import thunderRainImage from "../images/weather/thunder-rain.svg";
import thunderShowersDayImage from "../images/weather/thunder-showers-day.svg";
import thunderShowersNightImage from "../images/weather/thunder-showers-night.svg";
import thunderImage from "../images/weather/thunder.svg";
import windImage from "../images/weather/wind.svg";

import waxingCrescent from "../images/moon-phases/crescente_1_freepik.png";
import firstQuarter from "../images/moon-phases/crescente_2_freepik.png";
import waxingGibbous from "../images/moon-phases/crescente_3_freepik.png";
import full_moon from "../images/moon-phases/lua_cheia_freepik.png";
import waningGibbous from "../images/moon-phases/minguante_1_freepik.png";
import lastQuarter from "../images/moon-phases/minguante_2_freepik.png";
import waningCrescent from "../images/moon-phases/minguante_3_freepik.png";
import new_moon from "../images/moon-phases/lua_nova_freepik.png";

const moonPhases = {
  waxingCrescent,
  firstQuarter,
  waxingGibbous,
  full_moon,
  waningGibbous,
  lastQuarter,
  waningCrescent,
  new_moon
};

const weather = {
  "clear-day": clearDayImage,
  "clear-night": clearNightImage,
  "cloudy": cloudyImage,
  "fog": fogImage,
  "hail": hailImage,
  "partly-cloudy-day": partlyCloudyDayImage,
  "partly-cloudy-night": partlyCloudyNightImage,
  "rain-snow-showers-day": rainSnowShowersDayImage,
  "rain-snow-showers-night": rainSnowShowersNightImage,
  "rain-snow": rainSnowImage,
  "rain": rainImage,
  "showers-day": showersDayImage,
  "showers-night": showersNightImage,
  "sleet": sleetImage,
  "snow-showers-day": snowShowersDayImage,
  "snow-showers-night": snowShowersNightImage,
  "snow": snowImage,
  "thunder-rain": thunderRainImage,
  "thunder-showers-day": thunderShowersDayImage,
  "thunder-showers-night": thunderShowersNightImage,
  "thunder": thunderImage,
  "wind": windImage,
};


export { moonPhases, weather };