import { useState } from "react";
import NavBar from "./NavBar";
import SearchCountry from "./SearchCountry";
import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";
import { useCountries } from "./contexts/CitiesContext";

// const REST_API_ALL = "https://restcountries.com/v3.1/all";

function AppLayout() {
  const [theme, setTheme] = useState("theme-light");
  const [isCheckDetails, setIsCheckDetails] = useState(false);

  const { countries } = useCountries();

  function handleSwitchTheme(e) {
    e.preventDefault();

    if (theme === "theme-light") setTheme("theme-dark");
    else setTheme("theme-light");
  }

  function handleCheckDetails(e) {
    e.preventDefault();
    setIsCheckDetails((isCheckDetails) => !isCheckDetails);
  }

  function goBack(e) {
    e.preventDefault();
    setIsCheckDetails((isCheckDetails) => !isCheckDetails);
  }

  //bg-theme-light-main text-theme-light-primary
  return (
    <div className="bg-theme-light-main text-theme-light-primary">
      {/* <div className={`text-${theme}-primary bg-${theme}-main`}> */}
      {/* {isLoading && <Loader />} */}
      <header>
        <NavBar switchTheme={handleSwitchTheme} />
      </header>
      <main>
        {isCheckDetails && (
          <section>
            <CountryDetails theme={theme} goBack={goBack} />
          </section>
        )}
        {!isCheckDetails && (
          <section>
            <SearchCountry theme={theme} />
            {countries && (
              <CountryList
                theme={theme}
                countries={countries}
                checkDetails={handleCheckDetails}
              />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default AppLayout;
