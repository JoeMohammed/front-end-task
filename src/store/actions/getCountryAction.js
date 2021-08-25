import * as actions from "./actionTypes";
import axios from "axios";

export const getCountry = (data) => async(dispatch) => {
  dispatch({ type: actions.GET_COUNTRY_START });

  let url = "https://restcountries.eu/rest/v2/all";

  await axios
    .get(url)
    .then((res) => {
      //   console.log(res.data);
      dispatch({ type: actions.GET_COUNTRY_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: actions.GET_COUNTRY_FAIL, payload: err.message });
    });
};
