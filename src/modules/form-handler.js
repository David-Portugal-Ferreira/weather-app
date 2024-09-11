import { fetchWeatherInfo } from "./weather-api";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("#search-input").value;
    const data = await fetchWeatherInfo(searchInput);
    console.log(data);
});



export {}