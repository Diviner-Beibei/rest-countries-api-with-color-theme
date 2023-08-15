import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const LOAD_COUNTRIES = "load-countries";
const QUERY_SINGLE_COUNTRY = "query-single-country";

const CountriesContext = createContext();

const initalState = {
  countries: [],
  isLoading: false,
  currentCountry: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case LOAD_COUNTRIES:
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
      };
    case QUERY_SINGLE_COUNTRY:
      return {
        ...state,
        isLoading: false,
        currentCountry: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

CountriesProvider.propTypes = {
  children: PropTypes.any,
};

function CountriesProvider({ children }) {
  const [{ countries, currentCountry, isLoading }, dispatch] = useReducer(
    reducer,
    initalState
  );

  /*  Load all country information  */
  useEffect(function () {
    async function readJson() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("./data.json");
        const data = await res.json();

        // console.log(LOAD_COUNTRIES, data);
        dispatch({ type: LOAD_COUNTRIES, payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading countries...",
        });
      }
    }
    readJson();
  }, []);

  /*  get single country information  */
  const getSingleCountry = useCallback(
    async function getCountry(code) {
      if (currentCountry.alpha3Code === code) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();

        // console.log(QUERY_SINGLE_COUNTRY, data);

        dispatch({ type: QUERY_SINGLE_COUNTRY, payload: data[0] });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the country...",
        });
      }
    },
    [currentCountry.alpha3Code]
  );

  return (
    <CountriesContext.Provider
      value={{ countries, currentCountry, getSingleCountry, isLoading }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined)
    throw new Error("CountriesContext was used outside the CountriesProvider");
  return context;
}

export { CountriesProvider, useCountries };
