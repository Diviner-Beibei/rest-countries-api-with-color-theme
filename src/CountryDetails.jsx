import PropTypes from "prop-types";
CountryDetails.propTypes = {
  data: PropTypes.object,
  goBack: PropTypes.func,
};

function CountryDetails({ data, goBack }) {
  return (
    <div className={`bg-theme-light-block py-10 mt-1 text-sm lg:text-base`}>
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

      <div className="flex flex-col gap-5 md:gap-0 lg:gap-20 xl:gap-32 mt-12 mx-auto w-[320px] justify-center md:flex-row md:w-full md:justify-around lg:justify-center">
        <img
          src={data["flags"]["svg"]}
          alt="national flag"
          className="max-w-[320px] shadow-sm  md:max-w-[380px] lg:max-w-[450px] xl:max-w-[560px]"
        />

        <div className="flex flex-col lg:flex-row gap-5 lg:relative xl:pt-8">
          <h2 className="text-2xl lg:text-4xl font-extrabold mt-3 lg:absolute">
            {data["name"]}
          </h2>
          <ul className="font-light flex flex-col gap-2 lg:mt-20">
            <li>
              <span className="font-semibold">Native Name: </span>
              {data["nativeName"]}
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
              {data["capital"]}
            </li>
          </ul>

          <ul className="font-light flex flex-col gap-2 lg:mt-20">
            <li>
              <span className="font-semibold">Top Level Domain: </span>
              {data["topLevelDomain"]}
            </li>
            <li>
              <span className="font-semibold">Currencies: </span>
              {data["currencies"]["name"]}
            </li>
            <li>
              <span className="font-semibold">Languages: </span>
              {data["languages"].map((e) => e["name"]).join(" ,")}
            </li>
          </ul>

          <div className="lg:absolute lg:top-64 xl:top-72">
            {data["borders"] && (
              <>
                <h3 className="text-base font-semibold">Border Countries: </h3>
                {data["borders"].map((e) => {
                  return (
                    <li className="shadow-normal px-4 py-1" key={e}>
                      ${e}
                    </li>
                  );
                })}
              </>
            )}
            {/* <h3 className="text-base font-semibold">Border Countries: </h3>
            <ul className="flex gap-3 mt-4">
              {data["borders"] &&
                data["borders"].map((e) => {
                  return (
                    <li className="shadow-normal px-4 py-1" key={e}>
                      ${e}
                    </li>
                  );
                })}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
