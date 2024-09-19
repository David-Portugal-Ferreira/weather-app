import "./index.css";
import "@fortawesome/fontawesome-free"

import { form, loadFiveCards } from "./modules/dom.manipulation.js"

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchLocation = document.querySelector("#search-location").value;
    await loadFiveCards(searchLocation);
    form.reset();
})

// loadFiveCards();