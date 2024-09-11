async function fetchWeatherInfo(city = "tomar") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current%2Cdays%2Chours&key=XJR6HMBJ5XLXYVTFEA7WFSYAH&contentType=json`,
      {
        method: "GET",
        headers: {},
      },
    );
    let data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
}

export { fetchWeatherInfo };
