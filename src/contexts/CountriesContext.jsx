import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const LOADING = "loading";
const NOT_FOUND = "not-found";
const LOAD_ALL_COUNTRIES = "load-all-countries";

const QUERY_COUNTRY_BY_CODE = "query-country-by-code";
const QUERY_COUNTRIRS_BY_REGION = "query-countries-by-region";
const QUERY_COUNTRIES_BY_INPUT = "query-countries-by-input";

const CountriesContext = createContext();

const initalState = {
  countries: [],
  currentCountries: [],
  isLoading: false,
  currentCountry: {},
  currentRegion: "",
  queryInfo: "",
  isNotFound: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case NOT_FOUND:
      return { ...state, isNotFound: true };
    case LOAD_ALL_COUNTRIES:
      return {
        ...state,
        isLoading: false,
        isNotFound: false,
        countries: action.payload,
        currentCountries: action.payload,
      };
    case QUERY_COUNTRIRS_BY_REGION:
      return {
        ...state,
        isLoading: false,
        isNotFound: false,
        currentRegion: action.payload.region,
        currentCountries: action.payload.regionCountries,
      };
    case QUERY_COUNTRIES_BY_INPUT:
      return {
        ...state,
        isLoading: false,
        isNotFound: false,
        queryInfo: action.payload.queryInfo,
        currentCountries: action.payload.data,
      };
    case QUERY_COUNTRY_BY_CODE:
      return {
        ...state,
        isLoading: false,
        isNotFound: false,
        currentCountry: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        isNotFound: false,
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
    {
      countries,
      currentCountry,
      currentRegion,
      currentCountries,
      isLoading,
      queryInfo,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  /*  Load all country information  */
  useEffect(function () {
    async function loadAllCountries() {
      dispatch({ type: LOADING });
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        dispatch({ type: LOAD_ALL_COUNTRIES, payload: data });
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
      dispatch({ type: LOADING });
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        dispatch({ type: QUERY_COUNTRY_BY_CODE, payload: data[0] });
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
      dispatch({ type: LOADING });
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        const regionCountries = await res.json();

        console.log("getCountriesByRegion", regionCountries);
        dispatch({
          type: QUERY_COUNTRIRS_BY_REGION,
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

  /* Search by country’s full name. It can be the common or official value*/
  //https://restcountries.com/v3.1/name/{name}?fullText=true
  // const getCountriesByInput = useCallback(
  //   async function getCountryByFullName(inputInfo) {
  //     if (queryInfo === inputInfo) return;
  //     dispatch({ type: LOADING });
  //     try {
  //       const res = await fetch(
  //         `https://restcountries.com/v3.1/name/${inputInfo}?fullText=true`
  //       );
  //       const data = await res.json();
  //       console.log("getCountriesByInput", data);
  //       if (data.status === "404") {
  //         dispatch({ type: NOT_FOUND });
  //         return;
  //       }

  //       dispatch({
  //         type: QUERY_COUNTRIES_BY_INPUT,
  //         payload: {
  //           queryInfo: inputInfo,
  //           data,
  //         },
  //       });
  //     } catch (error) {
  //       dispatch({
  //         type: "rejected",
  //         payload: "There was an error loading the country by input...",
  //       });
  //     }
  //   },
  //   [queryInfo]
  // );

  const getCountriesByInput = useCallback(
    function getCountriesByInput(inputInfo) {
      if (queryInfo === inputInfo) return;

      const res = countries.filter((e) =>
        e?.name?.common.toLowerCase().startsWith(inputInfo.toLowerCase())
      );

      console.log("getCountriesByInput", res);
      dispatch({
        type: QUERY_COUNTRIES_BY_INPUT,
        payload: {
          queryInfo: inputInfo,
          data: res,
        },
      });
    },
    [queryInfo, countries]
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
        getCountriesByInput,
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
