import { useState } from "react";
import NavBar from "./NavBar";
import SearchCountry from "./SearchCountry";
import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";

// const REST_API_ALL = "https://restcountries.com/v3.1/all";

function AppLayout() {
  const [theme, setTheme] = useState("light");
  const [isCheckDetails, setIsCheckDetails] = useState(false);

  function handleSwitchTheme(e) {
    e.preventDefault();

    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  function handleCheckDetails(e) {
    e.preventDefault();
    setIsCheckDetails((isCheckDetails) => !isCheckDetails);
  }

  function goBack(e) {
    e.preventDefault();
    setIsCheckDetails((isCheckDetails) => !isCheckDetails);
  }

  // const style = `text-dark-primary bg-dark-main h-sscreen`;
  //text-${theme}-primary bg-${theme}-main h-screen
  return (
    <div className={`text-${theme}-primary bg-${theme}-main min-w-[375px]`}>
      {/* {isLoading && <Loader />} */}
      <header>
        <NavBar theme={theme} switchTheme={handleSwitchTheme} />
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
            <CountryList theme={theme} checkDetails={handleCheckDetails} />
          </section>
        )}
      </main>
    </div>
  );
}

export default AppLayout;
