class FixedExpense {
    constructor(title, description, amount, currency, date, categoryId) {
      this.title = title;
      this.description = description;
      this.amount = amount;
      this.currency = currency;
      this.date = date;
      this.categoryId = categoryId; // ID of the category
      this.adminId = adminId;
    }
  }
  
  module.exports = FixedExpense;
  