import { useState } from "react";
import PropTypes from "prop-types";
import { useCountries } from "./contexts/CitiesContext";
SearchCountry.propTypes = {
  theme: PropTypes.string,
};

function SearchCountry({ theme }) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const {
    currentRegion,
    getCountriesByRegion,
    queryInfo,
    getCountriesByInput,
  } = useCountries();

  function handleSearch(e) {
    e.preventDefault();
    // if (e.target.value.length < 2) return;
    if (!/[a-z]/gi.test(e.target.value)) return;

    // console.log(e.target.value);
    getCountriesByInput(e.target.value);
  }

  function handleSelectContinent(e) {
    e.preventDefault();
    console.log(e.target.textContent);
    if (!e.target.textContent) return;
    setIsOpenFilter((isOpenFilter) => !isOpenFilter);

    getCountriesByRegion(e.target.textContent);
  }

  function handleOpenFilter(e) {
    e.preventDefault();

    setIsOpenFilter((isOpenFilter) => !isOpenFilter);
  }

  return (
    <div className="py-5 px-4 flex flex-col gap-10 flex-grow md:flex-row md:items-center md:justify-between md:px-10">
      {/* shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] */}
      <div
        className={`flex items-center gap-2 px-5 py-2 w-[343px] max-h-[48px] rounded-md shadow-md relative md:max-w-none lg:w-[480px] bg-${theme}-block`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
            fill="#B2B2B2"
          />
        </svg>

        <input
          type="text"
          onChange={handleSearch}
          value={queryInfo}
          className={`text-${theme}-search px-4 py-2 focus:outline-none text-xs w-full bg-${theme}-block`}
          placeholder="Search for a country..."
        />
      </div>

      <div
        className={`shadow-normal max-w-[200px] overflow-hidden rounded-md text-xs font-nunito-sans`}
      >
        <button
          className={`pl-8 py-4 flex items-center gap-12 md:pr-4 rounded-md bg-${theme}-block w-full overflow-hidden`}
          onClick={handleOpenFilter}
        >
          <span>{currentRegion || "Filter by Region"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>
        {isOpenFilter && (
          <ul
            className={`flex flex-col rounded-md mt-1 bg-${theme}-block overflow-hidden absolute z-10 max-w-[200px] w-full bg-theme-light-block shadow`}
            onClick={handleSelectContinent}
          >
            <li className="pl-8 py-2 hover:bg-gray-300">Africa</li>
            <li className="pl-8 py-2 hover:bg-gray-300">America</li>
            <li className="pl-8 py-2 hover:bg-gray-300">Asia</li>
            <li className="pl-8 py-2 hover:bg-gray-300">Europe</li>
            <li className="pl-8 py-2 hover:bg-gray-300">Oceania</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchCountry;
