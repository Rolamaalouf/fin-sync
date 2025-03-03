const { supabase } = require('../db'); // Ensure this imports your Supabase client

class FixedIncome {
    constructor(title, description, amount, currency, date, categoryId, userId) {
        this.title = title;
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.date = date;
        this.categoryId = categoryId;
        this.userId = userId;
      }

  // Method to save the fixed income to the database
  async save() {
    const { data, error } = await supabase
      .from('fixed-income') // Ensure this matches your table name
      .insert([{ 
        title: this.title,
        description: this.description,
        amount: this.amount,
        currency: this.currency,
        date: this.date,
        category_id: this.categoryId, // Use the correct column name in the database
        user_id: this.userId // Ensure this matches your database schema
      }]);

    if (error) throw error;
    return data;
  }

  // Static method to fetch all fixed incomes
  static async getAllFixedIncomes() {
    const { data, error } = await supabase
      .from('fixed-income')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific fixed income by ID
  static async getFixedIncomeById(id) {
    const { data, error } = await supabase
      .from('fixed-income')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = FixedIncome;