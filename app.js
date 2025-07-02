const incomes = [];
const expenses = [];
let initialBudget = 0;

let loadApp = () => {
  // Set up event listeners
  document
    .getElementById("set-budget")
    .addEventListener("click", setInitialBudget);
  document
    .getElementById("initial-budget")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        setInitialBudget();
      }
    });

  // Load empty data
  loadHeader();
  loadIncomes();
  loadExpenses();
};

let setInitialBudget = () => {
  const budgetInput = document.getElementById("initial-budget");
  const budgetValue = parseFloat(budgetInput.value);

  if (!isNaN(budgetValue) && budgetValue >= 0) {
    initialBudget = budgetValue;
    budgetInput.disabled = true;
    document.getElementById("set-budget").disabled = true;
    loadHeader();
  } else {
    alert("Please enter a valid budget amount");
  }
};

let totalIncomes = () => {
  return incomes.reduce((total, income) => total + income.value, 0);
};
let totalExpenses = () => {
  return expenses.reduce((total, expense) => total + expense.value, 0);
};

let loadHeader = () => {
  const totalIncome = totalIncomes();
  const totalExpense = totalExpenses();
  const availableBudget = initialBudget + totalIncome - totalExpense;
  const totalBudget = initialBudget + totalIncome;
  const expensePercentage = totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0;

  document.getElementById("budgets").textContent = coinFormat(availableBudget);
  document.getElementById("percents").textContent = expensePercentage.toFixed(2) + "%";
  document.getElementById("incomes").textContent = coinFormat(totalIncome);
  document.getElementById("expenses").textContent = coinFormat(totalExpense);
};
const coinFormat = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const loadIncomes = () => {
  let incomesHTML = "";
  for (let income of incomes) {
    incomesHTML += `
    <div class="element cleanstyles">
      <div class="element_description">${income.description}</div>
      <div class="right cleanstyles">
        <div class="element_value">+ ${income.value.toFixed(2)}</div>
        <div class="element_delete">
          <button type="button" aria-label="Eliminar" class="element_delete--btn" onclick="deleteIncome(${
            income.id
          })">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("list-incomes").innerHTML =
    incomesHTML || "<div class='no-items'>No income recorded</div>";
};

const setupIncomesHTML = (income) => {
  let incomeHTML = `
  <div class="element cleanstyles">
  <div class="element_description">${income.description}</div>
  <div class="right cleanstyles">
    <div class="element_value">+ ${coinFormat(income.value)}</div>
    <div class="element_delete">
      <button class="element_delete--btn">
        <ion-icon name="close-circle-outline"
        onclick='deleteIncome(${income.id})'></ion-icon>
      </button>
    </div>
  </div>
</div>
  `;
  return incomeHTML;
};

const deleteIncome = (id) => {
  let indexDelete = incomes.findIndex((income) => income.id === id);
  incomes.splice(indexDelete, 1);
  loadHeader();
  loadIncomes();
};

const loadExpenses = () => {
  let expensesHTML = "";
  const totalExpense = totalExpenses();
  const totalBudget = initialBudget + totalIncomes();

  for (let expense of expenses) {
    const percentage = totalBudget > 0 ? ((expense.value / totalBudget) * 100).toFixed(2) : 0;

    expensesHTML += `
    <div class="element cleanstyles">
      <div class="element_description">${expense.description}</div>
      <div class="right cleanstyles">
        <div class="element_value">- ${expense.value.toFixed(2)}</div>
        <div class="element_percent">${percentage}%</div>
        <div class="element_delete">
          <button type="button" aria-label="Eliminar" class="element_delete--btn" onclick="deleteExpense(${
            expense.id
          })">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("list_expenses").innerHTML =
    expensesHTML || "<div class='no-items'>No expenses recorded</div>";
};

const setupExpensesHTML = (expense) => {
  let expenseHTML = `
  <div class="element cleanstyles">
            <div class="element_description">${expense.description}</div>
            <div class="right cleanstyles">
              <div class="element_value">- ${coinFormat(expense.value)}</div>
              <div class="element_percent">${(
                expense.value / totalExpenses()
              ).toFixed(2)}%</div>
              <div class="element_delete">
                <button class="element_delete--btn">
                  <ion-icon name="close-circle-outline"
                  onclick='deleteExpense(${expense.id})'></ion-icon>
                </button>
              </div>
          </div>
        </div>`;
  return expenseHTML;
};

const deleteExpense = (id) => {
  let indexDelete = expenses.findIndex((expense) => expense.id === id);
  expenses.splice(indexDelete, 1);
  loadHeader();
  loadExpenses();
};

let addData = () => {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  let type = document.getElementById("type").value;
  let description = document.getElementById("description").value.trim();
  let value = parseFloat(document.getElementById("value").value);

  if (description && !isNaN(value) && value > 0) {
    if (type === "income") {
      let newIncome = new Income(description, value);
      incomes.push(newIncome);
      loadHeader();
      loadIncomes();
    } else if (type === "expense") {
      let newExpense = new Expense(description, value);
      expenses.push(newExpense);
      loadHeader();
      loadExpenses();
    }

    // Limpiar el formulario
    document.getElementById("description").value = "";
    document.getElementById("value").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").focus();
  }

  return false;
};
