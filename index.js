#!/usr/bin/env node

const { addExpense, listExpenses, deleteExpense, getSummary, listByCategory, setMonthlyBudget, exportToCsv } = require("./src/application/expenseService");
const { loadBudgets } = require("./src/infrastructure/fileStorage");

const args = process.argv.slice(2);
const command = args[0];

try {
  switch (command) {
    case "add":
      const descInd = args.indexOf("--description");
      const amountInd = args.indexOf("--amount");
      const categoryInd = args.indexOf("--category");

      const description = args[descInd + 1];
      const amount = args[amountInd + 1];
      const category = categoryInd !== -1 ? args[categoryInd + 1] : "general";

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const budgets = loadBudgets();
      const budget = budgets.find(b => b.month === currentMonth && b.year === currentYear);

      if (budget) {
        const total = getSummary(currentMonth);
        if (total + Number(amount) > budget.amount) {
          console.log("⚠ Warning: Monthly budget exceeded!");
        }
      }

      const expense = addExpense(description, amount, category);
      console.log(`Expense added succesfully (ID: ${expense.id})`);
      break;
    case "set-budget":
      const monthIndex = args.indexOf("--month");
      const amountIndex = args.indexOf("--amount");

      setMonthlyBudget(args[monthIndex + 1], args[amountIndex + 1]);
      console.log("Monthly budget set successfully");
      break;
    case "list":
      const expenses = listExpenses();
      console.log("ID    Date        Description    Amount  Category");
      expenses.forEach(exp => {
        console.log(`${exp.id}    ${new Date(exp.date).toISOString().split("T")[0]}    ${exp.description}           ${exp.amount}    ${exp.category}`);
      });
      break;
    case "list-category":
      const catInd = args.indexOf("--category");
      const cat = args[catInd + 1];

      const filtered = listByCategory(cat);

      if (filtered.length === 0) {
        console.log(`No expenses found for the category ${cat}`);
      }
      filtered.forEach(exp => {
        console.log(`${exp.id}    ${new Date(exp.date).toISOString().split("T")[0]}    ${exp.description}    ${exp.amount}    ${exp.category}`);
      });
      break;
    case "delete":
      const index = args.indexOf("--id");
      deleteExpense(args[index + 1]);
      console.log("Expense deleted succesfully");
      break;
    case "summary":
      const monthInd = args.indexOf("--month");

      const month = monthInd !== -1 ? args[monthInd + 1] : null;

      const summary = getSummary(month);

      if (month) {
        console.log(`Total expenses for ${month}: ${summary}`);
      } else {
        console.log(`Total expenses: ${summary}`);
      }
      break;
    case "export":
      exportToCsv();
      console.log("Expenses exported to csv at: ", __dirname + "\\expenses.csv");
      break;
    default:
      console.log("Invalid command");
  }
} catch (error) {
  console.log("Error: ", error.message);
}