export const fetchCurrencies = async () => {
  const data = await fetch(
    `https://api.currencybeacon.com/v1/currencies?api_key=${
      import.meta.env.VITE_CURRENCY_API_KEY
    }`
  );
  return await data.json();
};

export const fetchConversion = async ({ from, to, amount }) => {
  console.log(from, to, amount);
  console.log(!!from, !!to, !!amount);

  if (!!from && !!to & !!amount) {
    const data = await fetch(
      `https://api.currencybeacon.com/v1/convert?from=${from}&to=${to}&amount=${amount}&api_key=${
        import.meta.env.VITE_CURRENCY_API_KEY
      }`
    );
    return await data.json();
  } else {
    console.log("Made it into else!");
    return null;
  }
};
