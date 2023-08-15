import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SearchCountry from "./SearchCountry";
import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";

function AppLayout() {
  const [theme, setTheme] = useState("theme-light");
  const [countryData, setCountryData] = useState("");
  const [isCheckDetails, setIsCheckDetails] = useState(false);
  const [countryDetailsData, setCountryDetailsData] = useState("");

  try {
    useEffect(() => {
      async function readJson() {
        const res = await fetch("./data.json");
        const data = await res.json();

        // console.log("111", res, data);
        if (!data) throw new Error("read data failure");
        setCountryData(data);
      }
      readJson();
    }, []);
  } catch (error) {
    console.log(error);
  }

  function handleSwitchTheme(e) {
    e.preventDefault();

    if (theme === "theme-light") setTheme("theme-dark");
    else setTheme("theme-light");
  }

  function handleCheckDetails(e, data) {
    e.preventDefault();

    console.log(e.target);
    console.log(data);
    setCountryDetailsData(data);

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
      <header className="">
        <NavBar switchTheme={handleSwitchTheme} />
      </header>
      <main>
        {isCheckDetails && (
          <section>
            <CountryDetails
              theme={theme}
              data={countryDetailsData}
              goBack={goBack}
            />
          </section>
        )}
        {!isCheckDetails && (
          <section>
            <SearchCountry theme={theme} />
            {countryData && (
              <CountryList
                theme={theme}
                countryData={countryData}
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
