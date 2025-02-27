const { supabase } = require('../db'); // Ensure this imports your Supabase client

class Category {
  constructor(name, adminId) {
    this.name = name;
    this.adminId = adminId; // Now correctly passed as a parameter
  }

  // Method to save the category to the database
  async save() {
    const { data, error } = await supabase
      .from('categories') // Ensure this matches your table name
      .insert([{ name: this.name, admin_id: this.adminId }]); // Use the correct column name in the database

    if (error) throw error;
    return data;
  }

  // Static method to fetch all categories
  static async getAllCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific category by ID
  static async getCategoryById(id) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }


}

module.exports = Category;