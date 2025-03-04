const { supabase } = require('../db').supabase;

class FixedExpense {
  constructor(title, description, amount, currency, date, categoryId, userId) {
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.categoryId = categoryId; // ID of the category
    this.userId = userId; // ID of the admin creating the expense
  }

  // Method to save the fixed expense to the database
  async save() {
    const { data, error } = await supabase
      .from('fixed_expenses') // Ensure this matches your table name
      .insert([
        {
          title: this.title,
          description: this.description,
          amount: this.amount,
          currency: this.currency,
          date: this.date,
          category_id: this.categoryId, // Use the correct column name in the database
          user_id: this.userId // Ensure this matches your database schema
        }
      ]);

    if (error) throw error;
    return data;
  }

  // Static method to fetch all fixed expenses
  static async getAllFixedExpenses() {
    const { data, error } = await supabase
      .from('fixed_expenses')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific fixed expense by ID
  static async getFixedExpenseById(id) {
    const { data, error } = await supabase
      .from('fixed_expenses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = FixedExpense;
