const { supabase } = require('../db'); // Ensure this imports your Supabase client

class ProfitGoal {
  constructor(amount, targetDate, adminId) {
    this.amount = amount;
    this.targetDate = targetDate;
    this.adminId = adminId; // ID of the admin creating the profit goal
  }

  // Method to save the profit goal to the database
  async save() {
    const { data, error } = await supabase
      .from('profit_goals') // Ensure this matches your table name
      .insert([{ 
        amount: this.amount, 
        target_date: this.targetDate, // Use the correct column name in the database
        admin_id: this.adminId // Ensure this matches your database schema
      }]);

    if (error) {
      console.error('Error inserting data:', error);
      throw error;
    }
    return data;
  }

  // Static method to fetch all profit goals
  static async getAllProfitGoals() {
    const { data, error } = await supabase
      .from('profit_goals') // Ensure this matches your table name
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  // Static method to fetch a specific profit goal by ID
  static async getProfitGoalById(id) {
    const { data, error } = await supabase
      .from('profit_goals') // Ensure this matches your table name
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }
}

module.exports = ProfitGoal;