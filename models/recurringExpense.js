const { supabase } = require('../db'); // Ensure this imports your Supabase client

class RecurringExpense {
  constructor(title, description, amount, currency, startDate, endDate, categoryId, adminId, userId) {
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.startDate = startDate;
    this.endDate = endDate;
    this.categoryId = categoryId; // ID of the category
    this.adminId = adminId; // ID of the admin creating the expense
    this.userId = userId;
  }

  // Method to save the recurring expense to the database
  async save() {
    const { data, error } = await supabase
      .from('recurringExpense') // Ensure this matches your table name
      .insert([{ 
        title: this.title, 
        description: this.description, 
        amount: this.amount, 
        currency: this.currency, 
        start_date: this.startDate, // Use the correct column name in the database
        end_date: this.endDate, 
        category_id: this.categoryId, // Ensure this matches your database schema
        admin_id: this.adminId, // Ensure this matches your database schema
        user_id: this.userId
      }]);

    if (error) throw error;
    return data;
  }

  // Static method to fetch all recurring expenses
  static async getAllRecurringExpenses() {
    const { data, error } = await supabase
      .from('recurringExpense')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific recurring expense by ID
  static async getRecurringExpenseById(id) {
    const { data, error } = await supabase
      .from('recurringExpense')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = RecurringExpense;