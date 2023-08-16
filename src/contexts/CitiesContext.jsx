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
const GET_COUNTRIRS_BY_REGION = "get-countries-by-region";

const CountriesContext = createContext();

const initalState = {
  countries: [],
  currentCountries: [],
  isLoading: false,
  currentCountry: {},
  currentRegion: "",
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
        currentCountries: action.payload,
      };
    case GET_COUNTRIRS_BY_REGION:
      return {
        ...state,
        isLoading: false,
        currentRegion: action.payload.region,
        currentCountries: action.payload.regionCountries,
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
  const [
    { countries, currentCountry, currentRegion, currentCountries, isLoading },
    dispatch,
  ] = useReducer(reducer, initalState);

  /*  Load all country information  */
  useEffect(function () {
    async function loadAllCountries() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        // console.log(LOAD_COUNTRIES, data);
        dispatch({ type: LOAD_COUNTRIES, payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading all countries...",
        });
      }
    }
    loadAllCountries();
  }, []);

  /*  get single country information  by code */
  const getCountryByCode = useCallback(
    async function getCountryByCode(code) {
      if (currentCountry.alpha3Code === code) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        dispatch({ type: QUERY_SINGLE_COUNTRY, payload: data[0] });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the country by code...",
        });
      }
    },
    [currentCountry.alpha3Code]
  );

  /* get resgion countries by region */
  const getCountriesByRegion = useCallback(
    async function getCountriesByRegion(region) {
      if (currentRegion === region) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        const regionCountries = await res.json();

        console.log("getCountriesByRegion", regionCountries);
        dispatch({
          type: GET_COUNTRIRS_BY_REGION,
          payload: { region, regionCountries },
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the country by region...",
        });
      }
    },
    [currentRegion]
  );

  return (
    <CountriesContext.Provider
      value={{
        countries,
        currentCountry,
        currentRegion,
        currentCountries,
        getCountryByCode,
        getCountriesByRegion,
        isLoading,
      }}
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
