import { CountriesProvider } from "./contexts/CountriesContext";
import AppLayout from "./AppLayout";

function App() {
  return (
    <CountriesProvider>
      <AppLayout />
    </CountriesProvider>
  );
}

export default App;
