import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import { useCountries } from "./contexts/CitiesContext";
import Loader from "./Loader";

CountryList.propTypes = {
  theme: PropTypes.string,
  checkDetails: PropTypes.func,
};

function CountryList({ theme, checkDetails }) {
  const { currentCountries } = useCountries();
  if (!currentCountries) return <Loader />;

  return (
    <div className="mt-4 md:10 grid gap-10 grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {currentCountries &&
        currentCountries.map((data) => (
          <CountryItem
            data={data}
            key={data.name.common}
            theme={theme}
            checkDetails={checkDetails}
          />
        ))}
    </div>
  );
}

export default CountryList;
