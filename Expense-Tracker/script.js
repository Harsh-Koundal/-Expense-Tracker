// ------------------- DOM Elements -------------------
const date = document.getElementById('date');
const description = document.getElementById('description');
const category = document.getElementById('category');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('add');

const incomeEl = document.getElementById('income');
const totalExpenseEl = document.getElementById('total-expense');
const remainingBalanceEl = document.getElementById('reme-balance');
const transactionsBody = document.getElementById('transactionsBody');

const ul = document.querySelector('ul');
const menuIcon = document.querySelector('.menu-icon');

// ------------------- Menu Toggle -------------------
let menu = true;
menuIcon.addEventListener('click', () => {
  ul.style.visibility = menu ? "visible" : "hidden";
  menu = !menu;
});

// ------------------- Chart Setup -------------------
const ctx = document.getElementById('categoryChart').getContext('2d');
const categoryLabels = ['Food', 'Travel', 'Utilities', 'Entertainment'];
const chartData = {
  labels: categoryLabels,
  datasets: [{
    label: 'Expenses',
    data: [0, 0, 0, 0],
    backgroundColor: ['#4F46E5', '#22C55E', '#FACC15', '#EF4444'],
    borderWidth: 1
  }]
};

const categoryChart = new Chart(ctx, {
  type: 'doughnut',
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

// ------------------- State -------------------
let expenses = [];

// ------------------- On Page Load -------------------
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('expenses');
  if (saved) {
    expenses = JSON.parse(saved);
    expenses.forEach(addExpensesToTable);
    updateBalances(expenses);
    updateChartData(expenses);
  }

  // Set stored income
  const storedIncome = localStorage.getItem('totalIncome');
  const totalIncome = storedIncome ? parseFloat(storedIncome) : 0;
  incomeEl.textContent = `$${totalIncome.toFixed(2)}`;

  // Set stored remaining
  const storedRemaining = localStorage.getItem('remainingBalance');
  const remaining = storedRemaining ? parseFloat(storedRemaining) : totalIncome;
  remainingBalanceEl.textContent = `$${remaining.toFixed(2)}`;
});

// ------------------- Add Button Logic -------------------
addBtn.addEventListener('click', () => {
  const expeDate = date.value.trim();
  const expeDescription = description.value.trim();
  const expeCategory = category.value.trim();
  const expeAmount = amount.value.trim();

  if (!expeDate || !expeDescription || !expeCategory || !expeAmount) {
    alert("Please fill in all fields.");
    return;
  }

  const expense = {
    date: expeDate,
    description: expeDescription,
    category: expeCategory,
    amount: parseFloat(expeAmount).toFixed(2)
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  addExpensesToTable(expense);
  updateBalances(expenses);
  updateChartData(expenses);

  // Clear form
  date.value = "";
  description.value = "";
  category.value = "";
  amount.value = "";
});

// ------------------- Add Expense Row -------------------
function addExpensesToTable(expense) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${expense.date}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
    <td class="negative">-$${expense.amount}</td>
  `;
  transactionsBody.appendChild(row);
}

// ------------------- Balance Calculation -------------------
function updateBalances(expenses) {
  const totalIncome = parseFloat(localStorage.getItem('totalIncome') || "0");

  const totalExpense = expenses.reduce(
    (sum, e) => sum + parseFloat(e.amount),
    0
  );

  const remaining = totalIncome - totalExpense;

  incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
  remainingBalanceEl.textContent = `$${remaining.toFixed(2)}`;

  localStorage.setItem('remainingBalance', remaining.toFixed(2));
}

// ------------------- Chart Update -------------------
function updateChartData(expenses) {
  const categorySums = {
    Food: 0,
    Travel: 0,
    Utilities: 0,
    Entertainment: 0
  };

  expenses.forEach(exp => {
    if (categorySums.hasOwnProperty(exp.category)) {
      categorySums[exp.category] += parseFloat(exp.amount);
    }
  });

  chartData.datasets[0].data = categoryLabels.map(cat => categorySums[cat]);
  categoryChart.update();
}
