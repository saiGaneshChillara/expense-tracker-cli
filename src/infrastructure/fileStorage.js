const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "../../data/expenses.json");
const budgetPath = path.join(__dirname, "../../data/budgets.json");

function loadExpenses() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveExpenses(expenses) {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

function loadBudgets() {
  if (!fs.existsSync(budgetPath)) {
    fs.writeFileSync(budgetPath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(budgetPath));
}

function saveBudgets(budgets) {
  fs.writeFileSync(budgetPath, JSON.stringify(budgets, null, 2));
}

module.exports = { 
  loadExpenses, 
  saveExpenses,
  loadBudgets,
  saveBudgets,
};