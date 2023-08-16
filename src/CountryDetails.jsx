import PropTypes from "prop-types";
import { useCountries } from "./contexts/CitiesContext";
import Loader from "./Loader";
CountryDetails.propTypes = {
  goBack: PropTypes.func,
  theme: PropTypes.string,
};

function CountryDetails({ goBack, theme }) {
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
  //theme === "light" ? "" : "fill-white"
  return (
    <div
      className={`bg-${theme}-main pt-10 pb-10 md:px-5 mt-1 text-sm lg:text-base h-screen`}
    >
      <button
        className={`flex gap-2 items-center rounded-sm shadow-[0px_0px_7px_0_rgba(0,0,0,0.3)] px-4 py-2 ml-6 bg-${theme}-block`}
        onClick={goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          className={theme === "light" ? "" : "fill-white"}
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>

        <span className="font-light text-sm font-nunito-sans">Back</span>
      </button>

      <div className="flex flex-col gap-5 lg:gap-20 xl:gap-32 mt-12 mx-auto w-[320px] justify-center md:flex-row md:w-full md:justify-around lg:justify-center">
        <img
          src={data["flags"]["svg"]}
          alt="national flag"
          className="bg-cover max-w-[320px] shadow-md  md:max-w-[380px] lg:max-w-[450px] xl:max-w-[560px] rounded-md"
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
            <div className="lg:absolute lg:top-[380px] mb-10 lg:pb-20">
              <h3 className="text-base font-semibold">Border Countries: </h3>
              <ul
                className="flex flex-wrap gap-3 mt-4 md:max-w-[380px] lg:max-w-none"
                onClick={handleBorderClick}
              >
                {data["borders"].map((e) => {
                  return (
                    <li
                      className={`shadow-normal px-4 py-1 ccode bg-${theme}-block`}
                      key={e}
                    >
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
