import {
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import theme from "./theme";
import Header from "components/Header/Header";
import { useEffect, useState } from "react";
import ExchangesList from "components/ExchangesList/ExchangesList";
import axios from "axios";

const CURRENCIES = ["EUR", "USD", "KGS", "KZT", "RUB"];

const API_WITH_BASE_CURRENCY = (baseCurrency) =>
  `https://v6.exchangerate-api.com/v6/8134aa0b53b806ecc886e268/latest/${baseCurrency}`;

function App() {
  const [baseCurrency, setBaseCurrency] = useState("KGS");
  const [allCurrencies, setAllCurrencies] = useState({});

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const fetchRates = async (base) => {
    const response = await axios.get(API_WITH_BASE_CURRENCY(base));

    const onlyNeedCurrencies = Object.entries(
      response.data.conversion_rates
    ).reduce((acc, [key, value]) => {
      // console.log("acc: ", acc);
      // console.log("key: ", key);
      // console.log("value: ", value);
      // console.log("- - - - - - - - - - - - - - - - - - - - - - -");

      if (CURRENCIES.includes(key) && base !== key) {
        return {
          ...acc,
          [key]: value,
        };
      } else return acc;
    }, {});

    setAllCurrencies(onlyNeedCurrencies);
  };

  useEffect(() => {
    fetchRates(baseCurrency);
  }, [baseCurrency]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        baseCurrency={baseCurrency}
        onBaseCurrencyChange={handleBaseCurrencyChange}
      />
      <Toolbar />

      <Grid sx={{ margin: "50px" }} container justifyContent="space-around">
        <Grid item></Grid>
        <Grid item>
          <Paper
            elevation={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ExchangesList currencies={allCurrencies} />
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
