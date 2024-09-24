import "./index.css";
import "@fortawesome/fontawesome-free"

import { form, loadCards, loadingScreen } from "./modules/dom.manipulation.js";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchLocation = document.querySelector("#search-location").value;
    loadingScreen("start");
    await loadCards(searchLocation);
    loadingScreen("stop");
    form.reset();
})

async function firstLoad() {
    loadingScreen("start");
    await loadCards();
    loadingScreen("stop");
}

firstLoad()