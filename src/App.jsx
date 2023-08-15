import { CountriesProvider } from "./contexts/CitiesContext";
import AppLayout from "./AppLayout";

function App() {
  return (
    <CountriesProvider>
      <AppLayout />
    </CountriesProvider>
  );
}

export default App;
