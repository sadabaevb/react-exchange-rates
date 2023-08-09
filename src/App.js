import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Header from "components/Header/Header";
import { useState } from "react";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("KGS");

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        baseCurrency={baseCurrency}
        onBaseCurrencyChange={handleBaseCurrencyChange}
      />
    </ThemeProvider>
  );
}

export default App;
