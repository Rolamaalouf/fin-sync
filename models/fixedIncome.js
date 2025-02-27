const { supabase } = require('../db'); // Ensure this imports your Supabase client

class FixedIncome {
  constructor(title, description, amount, currency, date, categoryId, adminId) {
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.categoryId = categoryId; // ID of the category
    this.adminId = adminId; // ID of the admin creating the income
  }

  // Method to save the fixed income to the database
  async save() {
    const { data, error } = await supabase
      .from('fixed_incomes') // Ensure this matches your table name
      .insert([{ 
        title: this.title, 
        description: this.description, 
        amount: this.amount, 
        currency: this.currency, 
        date: this.date, 
        category_id: this.categoryId, // Use the correct column name in the database
        admin_id: this.adminId // Ensure this matches your database schema
      }]);

    if (error) throw error;
    return data;
  }

  // Static method to fetch all fixed incomes
  static async getAllFixedIncomes() {
    const { data, error } = await supabase
      .from('fixed_incomes')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific fixed income by ID
  static async getFixedIncomeById(id) {
    const { data, error } = await supabase
      .from('fixed_incomes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = FixedIncome;