class Expense {
  constructor(id, description, amount, category, date = new Date()) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.category = category || "general";
    this.date = date;
  }
}

module.exports = Expense;