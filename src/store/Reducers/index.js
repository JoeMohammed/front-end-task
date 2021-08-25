import { combineReducers } from "redux";
import { addCountry } from "./addCountryReducer";

export default combineReducers({
    addCountry: addCountry,
});