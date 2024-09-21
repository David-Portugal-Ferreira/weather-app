async function fetchWeatherInfo(city = "tomar") {
  if (localStorage.getItem("weather")) {
    const data = localStorage.getItem("weather");
    const weather = JSON.parse(data);
    const isToday = compareDate(weather.days[0].datetime);
    if (weather.address === city && isToday) {
      return JSON.parse(data);
    } else {
      try {
        console.log("dalhe");
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cprecip%2Cprecipprob%2Csnow%2Csnowdepth%2Cwindspeed%2Cwindspeedmax%2Cwinddir%2Cpressure%2Ccloudcover%2Cvisibility%2Cuvindex%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Ccurrent&key=XJR6HMBJ5XLXYVTFEA7WFSYAH&contentType=json`,
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
  } else {
    try {
      console.log("dalhe");
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cprecip%2Cprecipprob%2Csnow%2Csnowdepth%2Cwindspeed%2Cwindspeedmax%2Cwinddir%2Cpressure%2Ccloudcover%2Cvisibility%2Cuvindex%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Ccurrent&key=XJR6HMBJ5XLXYVTFEA7WFSYAH&contentType=json`,
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
}

function compareDate(datetime) {
  const day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let todayMonth = month < 10 ? `0${month}` : month;
  let year = new Date().getFullYear()
  const fullYear = `${year}-${todayMonth}-${day}`;

  if (datetime === fullYear ) {
    return true
  } else {
    return false;
  }
}

export { fetchWeatherInfo };
