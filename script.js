async function populateCurrencyDropdowns() {
  const fromCurrencyDropdown = document.getElementById("fromCurrency");
  const toCurrencyDropdown = document.getElementById("toCurrency");

  // Fetch exchange rates data
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();
  const currencies = Object.keys(data.rates);

  // Populate dropdowns with available currencies
  currencies.forEach(currency => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrencyDropdown.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrencyDropdown.appendChild(optionTo);
  });

  // Set default selections (optional)
  fromCurrencyDropdown.value = "USD";
  toCurrencyDropdown.value = "EUR";
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const result = document.getElementById("result");

  if (!amount) {
    result.innerText = "Please enter an amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    // Display the result
    result.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    result.innerText = "Error fetching exchange rates.";
  }
}

// Populate dropdowns when the page loads
window.onload = populateCurrencyDropdowns;
