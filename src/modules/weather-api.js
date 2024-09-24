async function fetchWeatherInfo(city = "tomar") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cprecip%2Cprecipprob%2Csnow%2Csnowdepth%2Cwindspeed%2Cwindspeedmax%2Cwinddir%2Cpressure%2Ccloudcover%2Cvisibility%2Cuvindex%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Ccurrent%2CiconSet=icons2&key=XJR6HMBJ5XLXYVTFEA7WFSYAH&contentType=json`,
      {
        method: "GET",
        headers: {},
      },
    );
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("weather", JSON.stringify(data));
      return data;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    return err;
  }
}

export { fetchWeatherInfo };
