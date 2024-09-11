async function fetchWeatherInfo(city = "tomar") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current%2Cdays%2Chours&key=XJR6HMBJ5XLXYVTFEA7WFSYAH&contentType=json`,
      {
        method: "GET",
        headers: {},
      },
    );
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    return err;
  }
}

export { fetchWeatherInfo };
