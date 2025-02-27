const { supabase } = require('../db'); // Ensure this imports your Supabase client

class Admin {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password; // Ensure you handle password securely
    this.role = role; // 'admin' or 'superAdmin'
  }

  // Method to save the admin to the database
  async save() {
    const { data, error } = await supabase
      .from('admins')
      .insert([{ name: this.name, email: this.email, password: this.password, role: this.role }]);

    if (error) throw error;
    return data;
  }

  // Static method to fetch all admins
  static async getAllAdmins() {
    const { data, error } = await supabase
      .from('admins')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific admin by ID
  static async getAdminById(id) {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Static method to update an admin
  static async updateAdmin(id, updates) {
    const { data, error } = await supabase
      .from('admins')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return data;
  }

  // Static method to delete an admin
  static async deleteAdmin(id) {
    const { data, error } = await supabase
      .from('admins')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  }
}

module.exports = Admin;