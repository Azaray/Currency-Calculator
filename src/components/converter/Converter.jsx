import { CurrencySelector } from "../currencySelector";
import { fetchConversion, fetchCurrencies } from "../../api/CurrencyApi";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const StyledTextField = styled(TextField)({
  width: 300,
  margin: "20px",
});

// Currency enum to avoid magic numbers when
// picking a default value for dropdown options
const CURRENCY = {
  GBP: 48,
  EUR: 45,
};

export default function Converter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("GBP");
  const [to, setTo] = useState("EUR");

  const {
    isLoading: currencyLoading,
    isError: currencyIsError,
    error: currencyError,
    data: currencyData,
  } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });

  const {
    isLoading: convertLoading,
    isError: convertIsError,
    error: convertError,
    data: convertData,
  } = useQuery({
    queryKey: ["convert", from, to, amount],
    queryFn: () => fetchConversion({ from, to, amount }),
  });

  if (currencyLoading) {
    return <div>Loading...</div>;
  }

  if (currencyIsError) {
    return (
      <div>
        Error:
        {currencyError.message}
      </div>
    );
  }

  if (convertIsError) {
    return (
      <div>
        Error:
        {convertError.message}
      </div>
    );
  }
  const currencyOptions = currencyData.response;

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromChange = (event, newValue) => {
    if (newValue) {
      setFrom(newValue.short_code);
    } else {
      setFrom("");
    }
  };

  const handleToChange = (event, newValue) => {
    if (newValue) {
      setTo(newValue.short_code);
    } else {
      setTo("");
    }
  };

  return (
    <div>
      <StyledTextField
        id="amount-input"
        label="Amount"
        variant="outlined"
        defaultValue={amount}
        onChange={handleAmountChange}
        multiline
      />
      <CurrencySelector
        id="from-selector"
        currencies={currencyOptions}
        label="From"
        defaultValue={CURRENCY.GBP}
        setter={handleFromChange}
      />
      <CurrencySelector
        id="to-selector"
        currencies={currencyOptions}
        label="To"
        defaultValue={CURRENCY.EUR}
        setter={handleToChange}
      />
      {convertLoading ? (
        <div>Conversion loading...</div>
      ) : (!!from && !!to && !!amount) === false ? (
        <div>Please use in the inputs above to convert currency</div>
      ) : (amount || convertData.response.value) < 1000000000 ? (
        <h2>
          {amount} {from} = {convertData.response.value.toFixed(2)} {to}
        </h2>
      ) : (
        <h2>
          {Number(amount).toPrecision(10)} {from} ={" "}
          {Number(convertData.response.value).toPrecision(10)} {to}
        </h2>
      )}
    </div>
  );
}
