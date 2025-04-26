// Load saved data when page loads
window.onload = () => {
    const fields = ["initialMoney", "monthlyInterest", "monthlyDeposit", "months"];
    fields.forEach(id => {
      const saved = localStorage.getItem(id);
      if (saved !== null) {
        document.getElementById(id).value = saved;
      }
    });
  };
  
  // Save inputs to localStorage on change
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      localStorage.setItem(input.id, input.value);
    });
  });
  
  function calculate() {
    const initialMoney = parseFloat(document.getElementById("initialMoney").value);
    const interest = parseFloat(document.getElementById("monthlyInterest").value) / 100;
    const monthlyDeposit = parseFloat(document.getElementById("monthlyDeposit").value);
    const months = parseInt(document.getElementById("months").value);

    let totalDeposit = initialMoney;
  
    let currentBalance = initialMoney;
    const resultGrid = document.getElementById("resultGrid");
    resultGrid.innerHTML = `
      <div class="tableHeader">Month</div>
      <div class="tableHeader">Deposit</div>
      <div class="tableHeader text-green">Earned</div>
      <div class="tableHeader text-blue">Total</div>
    `;
  
    for (let month = 1; month <= months; month++) {
      const earned = currentBalance * interest;
      currentBalance += earned;
  
      resultGrid.innerHTML += `
        <div class="text-grey">${month}</div>
        <div>${formatNumber(totalDeposit.toFixed(0))}</div>
        <div class="text-green">${formatNumber(earned.toFixed(0))}</div>
        <div class="text-blue">${formatNumber(currentBalance.toFixed(0))}</div>
      `;
      totalDeposit += monthlyDeposit;
      currentBalance += monthlyDeposit;
    }
  }
  
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }