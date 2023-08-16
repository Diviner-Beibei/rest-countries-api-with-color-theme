import PropTypes from "prop-types";
import { useCountries } from "./contexts/CitiesContext";
import Loader from "./Loader";
CountryDetails.propTypes = {
  goBack: PropTypes.func,
};

function CountryDetails({ goBack }) {
  const { currentCountry: data, isLoading, getCountryByCode } = useCountries();
  console.log(isLoading, data);
  if (isLoading || !data) return <Loader />;

  let languages,
    currenciesName,
    nativeName = "";

  if (data.languages)
    languages = Object.entries(data.languages)
      .map((e) => e[1])
      .join(", ");

  if (data.currencies)
    currenciesName = Object.entries(data.currencies)[0][1].name;

  if (data.name.nativeName)
    nativeName = Object.entries(data.name.nativeName)[0][1].official;

  console.log(
    languages,
    currenciesName,
    "---",
    Object.entries(data.name.nativeName)[0][1].official
  );

  function handleBorderClick(e) {
    if (e.target.classList.contains("ccode")) {
      // console.log(e.target.classList);

      getCountryByCode(e.target.textContent);
    }
  }

  return (
    <div
      className={`bg-theme-light-block pt-10 pb-10 md:px-5 mt-1 text-sm lg:text-base`}
    >
      <button
        className="flex gap-2 rounded-sm shadow-[0px_0px_7px_0_rgba(0,0,0,0.3)] px-4 py-2 ml-6"
        onClick={goBack}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="call-made">
            <path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z"
              fill="#111517"
            />
          </g>
        </svg>

        <span className="font-light text-sm font-nunito-sans">Back</span>
      </button>

      <div className="flex flex-col gap-5 lg:gap-20 xl:gap-32 mt-12 mx-auto w-[320px] justify-center md:flex-row md:w-full md:justify-around lg:justify-center">
        <img
          src={data["flags"]["svg"]}
          alt="national flag"
          className="bg-cover max-w-[320px] shadow-md  md:max-w-[380px] lg:max-w-[450px] xl:max-w-[560px]"
        />

        <div className="flex flex-col lg:flex-row gap-5 lg:relative xl:pt-8">
          <h2 className="text-2xl lg:text-4xl font-extrabold mt-3 lg:absolute">
            {data["name"]["common"]}
          </h2>
          <ul className="font-light flex flex-col gap-2 lg:mt-20">
            <li>
              <span className="font-semibold">Native Name: </span>
              {nativeName}
            </li>
            <li>
              <span className="font-semibold">Population: </span>
              {data["population"]}
            </li>
            <li>
              <span className="font-semibold">Region: </span>
              {data["region"]}
            </li>
            <li>
              <span className="font-semibold">Sub Region: </span>
              {data["subregion"]}
            </li>
            <li>
              <span className="font-semibold">Capital: </span>
              {data["capital"] && data["capital"][0]}
            </li>
          </ul>

          <ul className="font-light flex flex-col gap-2 lg:mt-20">
            <li>
              <span className="font-semibold">Top Level Domain: </span>
              {data["tld"] && data["tld"][0]}
            </li>
            <li>
              <span className="font-semibold">Currencies: </span>
              {currenciesName}
            </li>
            <li>
              <span className="font-semibold">Languages: </span>
              {languages}
            </li>
          </ul>

          {data["borders"] && (
            <div className="lg:absolute lg:top-64 xl:top-72 mb-10 lg:pb-20">
              <h3 className="text-base font-semibold">Border Countries: </h3>
              <ul
                className="flex flex-wrap gap-3 mt-4 md:max-w-[380px] lg:max-w-none"
                onClick={handleBorderClick}
              >
                {data["borders"].map((e) => {
                  return (
                    <li className="shadow-normal px-4 py-1 ccode" key={e}>
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
