const incomes = [
  new Income("Salary", 2100),
  new Income("car", 1500),
  new Income("DJ", 1500),
];
const expenses = [
  new Expense("rent", 1000),
  new Expense("food", 300),
  new Expense("dog", 50),
];

let loadApp = () => {
  loadHeader();
  loadIncomes();
  loadExpenses();
};

let totalIncomes = () => {
  let totalIncome = 0;
  for (let income of incomes) {
    totalIncome += income.value;
  }
  return totalIncome;
};
let totalExpenses = () => {
  let totalExpense = 0;
  for (let expense of expenses) {
    totalExpense += expense.value;
  }
  return totalExpense;
};

let loadHeader = () => {
  let budget = totalIncomes() - totalExpenses();
  let percentage = (totalExpenses() / totalIncomes()) * 100;
  document.getElementById("budgets").innerHTML = coinFormat(budget);
  document.getElementById("percents").innerHTML = percentage.toFixed(2) + "%";
  document.getElementById("incomes").innerHTML = coinFormat(totalIncomes());
  document.getElementById("expenses").innerHTML = coinFormat(totalExpenses());
};
const coinFormat = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimunFractionDigits: 2,
  });
};

const loadIncomes = () => {
  let incomesHTML = "";
  for (let income of incomes) {
    incomesHTML += setupIncomesHTML(income);
  }
  document.getElementById("list-incomes").innerHTML = incomesHTML;
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
  for (let expense of expenses) {
    expensesHTML += setupExpensesHTML(expense);
  }
  document.getElementById("list_expenses").innerHTML = expensesHTML;
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
  let form = document.forms["form"];
  let type = form["type"];
  let description = form["description"];
  let value = form["value"];
  if (description.value !== "" && value.value !== "") {
    if (type.value === "income") {
      incomes.push(new Income(description.value, +value.value));
      loadHeader();
      loadIncomes();
    } else if (type.value === "expense") {
      expenses.push(new Expense(description.value, +value.value));
      loadHeader();
      loadExpenses();
    }
  }
};
