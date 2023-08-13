import PropTypes from "prop-types";
import CountryItem from "./CountryItem";

CountryList.propTypes = {
  theme: PropTypes.string,
  countryData: PropTypes.array,
  checkDetails: PropTypes.func,
};

function CountryList({ theme, countryData, checkDetails }) {
  return (
    <div className="mt-10 grid gap-10 grid-cols-1 justify-items-center">
      {countryData.map((data) => (
        <CountryItem
          data={data}
          key={data["name"]}
          theme={theme}
          checkDetails={checkDetails}
        />
      ))}
    </div>
  );
}

export default CountryList;
