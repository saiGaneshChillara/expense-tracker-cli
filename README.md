# Expense Tracker CLI

A **command-line expense tracker** built using **Clean Architecture** in Node.js.  
This tool helps you manage your daily expenses, view summaries, categorize spending, set budgets, and export data — all from the terminal.
This is built as solution for https://roadmap.sh/projects/expense-tracker

---

## 🚀 Features

✔ Add an expense with description, amount, and category  
✔ View all expenses  
✔ Delete an expense  
✔ Filter expenses by category  
✔ View total summary of expenses  
✔ View summary for a specific month  
✔ Set monthly budget and show warning when exceeded  
✔ Export expenses to a CSV file  
✔ Built with Clean Architecture (modular, scalable, testable)  
✔ Installable globally as a CLI tool

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/saiGaneshChillara/expense-tracker-cli.git
cd expense-tracker-cli
```

Install dependencies (if any):

```bash
npm install
```

Link the CLI globally:

```bash
npm link
```

Now you can run:

```bash
expense-tracker <command>
```

---

## ▶️ Usage

### ➕ Add Expense

```bash
expense-tracker add --description "Lunch" --amount 20 --category food
```

✔ Output:

```
Expense added successfully (ID: 1)
```

---

### 📄 List All Expenses

```bash
expense-tracker list
```

---

### 📂 List by Category

```bash
expense-tracker list-category --category food
```

---

### ❌ Delete Expense

```bash
expense-tracker delete --id 2
```

✔ Output:

```
Expense deleted successfully
```

---

### 📊 Summary of Expenses

```bash
expense-tracker summary
```

✔ Summary for a specific month:

```bash
expense-tracker summary --month 8
```

---

### 💰 Set Monthly Budget

```bash
expense-tracker set-budget --month 8 --amount 500
```

⚠ If total expenses exceed budget, a warning will be shown when adding expenses.

---

### 📥 Export to CSV

```bash
expense-tracker export
```

Exports all expenses to:

```
expenses.csv
```

---

## 📁 Data Storage

Expenses and budgets are stored as JSON files in the `data/` directory:

- `data/expenses.json`  
- `data/budgets.json`

These files are auto-created and updated by the CLI.

---

## 🧠 Project Structure (Clean Architecture)

```
expense-tracker-cli/
├── data/
│   ├── expenses.json
│   └── budgets.json
├── src/
│   ├── domain/
│   │   └── Expense.js
│   ├── application/
│   │   └── expenseService.js
│   └── infrastructure/
│       └── fileStorage.js
├── index.js
├── .gitignore
└── package.json
```

---

## 🛠 Built With

- Node.js
- Native `fs` module
- JSON storage

---

## 📝 License

MIT

---

## 📦 Project URL

https://github.com/saiGaneshChillara/expense-tracker-cli
