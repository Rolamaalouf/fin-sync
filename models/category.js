const { supabase } = require('../db');

class Category {
  constructor(name, userId) {
    if (!name || !userId) {
      throw new Error('Name and user ID are required.');
    }
    this.name = name;
    this.userId = userId;
  }

  async save() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: this.name, user_id: this.userId }]);

      if (error) {
        console.error('Error saving category:', error);
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(id) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .limit(1);

      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }

      if (data.length === 0) {
        throw new Error('Category not found.');
      }

      return data[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Category;
