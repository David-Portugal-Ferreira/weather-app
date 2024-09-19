import "./index.css";
import "@fortawesome/fontawesome-free"

import { form, loadFiveCards, loadingScreen } from "./modules/dom.manipulation.js"

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchLocation = document.querySelector("#search-location").value;
    loadingScreen("start");
    await loadFiveCards(searchLocation);
    loadingScreen("stop");
    form.reset();
})

async function firstLoad() {
    loadingScreen("start");
    await loadFiveCards();
    loadingScreen("stop");
}

firstLoad()