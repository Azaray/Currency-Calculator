import { Autocomplete, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
  width: "300px",
  padding: "20px",
  marginLeft: "130px",
});

export default function CurrencySelector({
  currencies,
  label,
  defaultValue,
  setter,
}) {
  return (
    <StyledAutocomplete
      disablePortal
      autoSelect
      options={currencies}
      onChange={setter}
      defaultValue={`${currencies[defaultValue].short_code} - ${currencies[defaultValue].name}`}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option?.short_code} - ${option?.name}`
      }
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
