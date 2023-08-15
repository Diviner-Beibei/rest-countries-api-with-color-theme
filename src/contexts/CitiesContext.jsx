import { createContext, useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loadData":
      return {
        ...state,
        cities: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

CitiesProvider.propTypes = {
  children: PropTypes.any,
};

function CitiesProvider({ children }) {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initalState);

  useEffect(function () {
    async function readCitiesJson() {
      const res = await fetch("./data.json");
      const data = res.json();
      dispatch({ type: "loadData", paylod: data });
    }
    readCitiesJson();
  }, []);

  // function getCurrent

  return (
    <CitiesContext.Provider value={{ cities, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
