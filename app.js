const BASE_URL = "https://open.er-api.com/v6/latest";

const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultText = document.getElementById("result");
const rateText = document.getElementById("rateText");
const convertBtn = document.getElementById("convertBtn");

/* 
  Currency -> Country Code mapping
  (Used only for flags)
*/
const currencyToCountry = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  AUD: "AU",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  SGD: "SG",
  NZD: "NZ",
  AED: "AE",
  SAR: "SA",
  ZAR: "ZA",
  RUB: "RU",
  KRW: "KR",
  HKD: "HK",
  THB: "TH",
  MYR: "MY",
  IDR: "ID",
  PHP: "PH",
  PKR: "PK",
  BDT: "BD",
  LKR: "LK",
  NPR: "NP",
  EGP: "EG",
  TRY: "TR",
  BRL: "BR",
  MXN: "MX",
  SEK: "SE",
  NOK: "NO",
  DKK: "DK",
  PLN: "PL",
  CZK: "CZ",
  HUF: "HU",
  ILS: "IL"
};

/* Populate dropdowns */
function populateDropdowns() {
  Object.keys(currencyToCountry).forEach(currency => {
    const countryCode = currencyToCountry[currency];

    const option1 = document.createElement("option");
    option1.value = currency;
    option1.innerText = currency;

    const option2 = option1.cloneNode(true);

    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });

  fromSelect.value = "USD";
  toSelect.value = "INR";
}

/* Update flag image */
function updateFlag(selectElement, flagImgId) {
  const currency = selectElement.value;
  const countryCode = currencyToCountry[currency];
  const flagImg = document.getElementById(flagImgId);

  flagImg.src = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

/* Currency conversion */
async function convertCurrency() {
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultText.innerText = "Enter a valid amount";
    rateText.innerText = "";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/${fromCurrency}`);
    const data = await response.json();

    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    resultText.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    rateText.innerText = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

  } catch (error) {
    resultText.innerText = "Error fetching exchange rate";
    rateText.innerText = "";
  }
}

/* Event listeners */
fromSelect.addEventListener("change", () => {
  updateFlag(fromSelect, "fromFlag");
  convertCurrency();
});

toSelect.addEventListener("change", () => {
  updateFlag(toSelect, "toFlag");
  convertCurrency();
});

convertBtn.addEventListener("click", convertCurrency);

/* Init */
populateDropdowns();
updateFlag(fromSelect, "fromFlag");
updateFlag(toSelect, "toFlag");
convertCurrency();
