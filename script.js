document.getElementById("generateButton").addEventListener("click", () => {
  const amountInput = document.getElementById("amountInput").value;
  const resultsContainer = document.getElementById("results");
  const summaryContainer = document.getElementById("resultSummary");
  resultsContainer.innerHTML = ""; // Clear previous results
  summaryContainer.textContent = ""; // Clear previous summary

  let amount = parseInt(amountInput, 10);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const results = [];
  while (amount > 0) {
    // Generate a value close to the maximum allowed but random
    let randomValue = Math.min(amount, Math.floor(Math.random() * 10000) + 39000);

    // Ensure the value is not divisible by 1000
    if (randomValue % 1000 === 0) {
      randomValue -= 1;
    }

    // Add the random value to results
    results.push(randomValue);
    amount -= randomValue;

    // If the remaining amount is small, add it directly and break
    if (amount > 0 && amount <= 49000) {
      results.push(amount);
      break;
    }
  }

  // Display the results as buttons
  results.forEach((value) => {
    const button = document.createElement("button");
    button.className = "result-button";
    button.textContent = value;
    button.onclick = () => {
      navigator.clipboard.writeText(value).then(() => {
        button.classList.add("gray-out");
      });
    };
    resultsContainer.appendChild(button);
  });

  // Calculate and display the summary
  const total = results.reduce((sum, value) => sum + value, 0);
  summaryContainer.textContent = `Total: ${total}`;
});
