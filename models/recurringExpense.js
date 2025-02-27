class RecurringExpense {
    constructor(title, description, amount, currency, startDate, endDate, categoryId) {
      this.title = title;
      this.description = description;
      this.amount = amount;
      this.currency = currency;
      this.startDate = startDate;
      this.endDate = endDate;
      this.categoryId = categoryId; // ID of the category
      this.adminId = adminId;
    }
  }
  
  module.exports = RecurringExpense;
  