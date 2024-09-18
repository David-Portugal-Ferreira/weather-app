import "./index.css";
import "@fortawesome/fontawesome-free"

import * as weather from "./modules/weather-api.js";
import { loadFiveCards } from "./modules/dom.manipulation.js" 
import * as form from "./modules/form-handler.js";

loadFiveCards();