const incomeEl = document.getElementById('income');
const totalExpenseEl = document.getElementById('total-expense');
const remainingBalanceEl = document.getElementById('reme-balance');
const transactionsBody = document.getElementById('transactionsBody');
const ul = document.querySelector('ul');
const menuIcon = document.querySelector('.menu-icon');
let menu = true
menuIcon.addEventListener('click',()=>{
    if(!menu){
     ul.style.visibility = "hidden"
     menu = true;
    }else{
     ul.style.visibility = "visible"
    menu=false; 

    }

})

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
        const expenses = JSON.parse(saved);
        updateBalances(expenses);
        renderTransactions(expenses);
    } else {

        incomeEl.textContent = `$50000.00`;
        totalExpenseEl.textContent = `$0.00`;
        remainingBalanceEl.textContent = `$50000.00`;
    }
    
     const loginEl = document.getElementById('login');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      loginEl.textContent = "Logout";
      loginEl.parentElement.href = "#";

      loginEl.addEventListener('click', () => {
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
      });
    } else {
      loginEl.textContent = "Log in";
      loginEl.parentElement.href = "login.html";
    }
});

function updateBalances(expenses) {
    const totalIncome = parseFloat(incomeEl.textContent.replace(/[^0-9.-]+/g, ""));

    const totalExpense = expenses.reduce(
        (sum, e) => sum + parseFloat(e.amount),
        0
    );

    const remainingBalance = totalIncome - totalExpense;

    incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
    remainingBalanceEl.textContent = `$${remainingBalance.toFixed(2)}`;
}

function renderTransactions(expenses) {
    transactionsBody.innerHTML = '';
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td class="negative">-$${expense.amount}</td>
    `;
        transactionsBody.appendChild(row);
    });
}

//  Category Chart

const ctx = document.getElementById('categoryChart').getContext('2d');

const categoryLabels = ['Food', 'Travel', 'Utilities', 'Entertainment'];

const chartData = {
    labels: categoryLabels,
    datasets: [{
        label: 'Expenses',
        data: [0, 0, 0, 0],
        backgroundColor: [
            '#4F46E5',
            '#22C55E',
            '#FACC15',
            '#EF4444'
        ],
        borderWidth:1
    }]
};

const categoryChart = new Chart(ctx , {
    type: 'doughnut',
    data: chartData,
    options:{
        responsive: true,
        plugins : {
            legend:{
                position : 'bottom'
            }
        }
    }
});

window.addEventListener('DOMContentLoaded',()=>{
    const saved = localStorage.getItem('expenses');
    if(saved){
        const expenses = JSON.parse(saved);
    updateChartData(expenses);
}
});

function updateChartData(expenses){
    const categorySums ={
        Food: 0,
        Travel:0,
        Utilities:0,
        Entertainment:0
        
    } ;

    expenses.forEach(exp =>{
        if(categorySums.hasOwnProperty(exp.category)){
            categorySums[exp.category] += parseFloat(exp.amount);
        }
    });

    chartData.datasets[0].data = categoryLabels.map(cat => categorySums[cat]);

    categoryChart.update();

}