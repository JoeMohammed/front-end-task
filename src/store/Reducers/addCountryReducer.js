import * as actions from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  allCountry: null,
  got: false,
};

export const addCountry = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_COUNTRY_START:
      return { ...state, loading: true };
    case actions.GET_COUNTRY_SUCCESS:
      return { ...state, loading: false, error: false, got: true, allCountry: action.payload };
    case actions.GET_COUNTRY_FAIL:
      return { ...state, loading: false, error: true, got: false, allCountry: null, };
    default:
      return state;
  }
};
