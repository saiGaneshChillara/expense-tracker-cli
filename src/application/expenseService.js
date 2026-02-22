const fs = require("fs");
const path = require("path");

const Expense = require("../domain/Expense");
const { loadExpenses, saveExpenses, loadBudgets, saveBudgets } = require("../infrastructure/fileStorage");


function addExpense(description, amount, category = "general") {
  if (!description || amount < 0) {
    throw new Error("Invalid expense details");
  }

  const expenses = loadExpenses();
  const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;

  const expense = new Expense(id, description, amount, category);
  expenses.push(expense);

  saveExpenses(expenses);

  return expense;
}

function listExpenses() {
  return loadExpenses();
}

function listByCategory(category) {
  const expenses = loadExpenses();
  return expenses.filter(exp => exp.category === category);
}

function deleteExpense(id) {
  const expenses = loadExpenses();
  const updated = expenses.filter(e => e.id !== Number(id));

  if (expenses.length === updated.length) {
    throw new Error("Expense not found");
  }

  saveExpenses(updated);
}

function getSummary(month = null) {
  const expenses = loadExpenses();
  let filtered = expenses;

  if (month) {
    filtered = expenses.filter(exp => {
      const expenseMonth = new Date(exp.date).getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const expenseYear = new Date(exp.date).getFullYear();

      return expenseMonth === Number(month) && expenseYear === currentYear;
    });
  }

  return filtered.reduce((sum, e) => sum + Number(e.amount), 0);
}

function setMonthlyBudget(month, amount) {
  const budgets = loadBudgets();
  const currentYear = new Date().getFullYear();

  const existing = budgets.find(b => b.month === Number(month) && b.year === currentYear);

  if (existing) {
    existing.amount = amount;
  } else {
    budgets.push({ month: Number(month), year: currentYear, amount });
  }

  saveBudgets(budgets);
}

function exportToCsv() {
  const expenses = loadExpenses();

  let csv = "ID,Date,Description,Amount,Category\n";

  expenses.forEach(e => {
    csv += `${e.id},${new Date(e.date).toISOString().split("T")[0]},${e.description},${e.amount},${e.category}\n`;
  });

  const csvPath = path.join(__dirname, "../../expenses.csv");

  fs.writeFileSync(csvPath, csv);

  console.log("file written");
}

module.exports = { 
  addExpense, 
  listExpenses, 
  deleteExpense, 
  getSummary, 
  listByCategory ,
  setMonthlyBudget,
  exportToCsv,
};