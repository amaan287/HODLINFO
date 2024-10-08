const port = 3003;
document.addEventListener("DOMContentLoaded", async () => {
  const tableRows = document.getElementById("tableRows");

  try {
    const response = await fetch(`http://localhost:${port}/api/tickers`);
    const data = await response.json();

    tableRows.innerHTML = data
      .map(
        (ticker, index) => `
          <tr>
              <td>${index + 1}</td>
              <td>${ticker.base_unit.toUpperCase()}</td>
              <td>₹ ${ticker.last}</td>
              <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
              <td class="${
                ticker.open > ticker.last ? "negative" : "positive"
              }">
                ${(((ticker.last - ticker.open) / ticker.open) * 100).toFixed(
                  2
                )} %
              </td>
              <td>₹ ${(ticker.buy - ticker.sell).toFixed(2)}</td>
          </tr>
      `
      )
      .slice(0, 10)
      .join("");
  } catch (error) {
    console.error("Failed to fetch data", error);
    tableRows.innerHTML = "<tr><td colspan='6'>Failed to load data</td></tr>";
  }
});
