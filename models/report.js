const { supabase } = require('../db'); // Ensure this imports your Supabase client

class Report {
  constructor(type, data, adminId) {
    this.type = type; // 'yearly', 'monthly', 'weekly'
    this.data = data; // Income and expense data
    this.adminId = adminId; // ID of the admin creating the report
  }

  // Method to save the report to the database
  async save() {
    const { data, error } = await supabase
      .from('reports') // Ensure this matches your table name
      .insert([{ 
        type: this.type, 
        data: this.data, // Store data as a JSON object if necessary
        admin_id: this.adminId // Ensure this matches your database schema
      }]);

    if (error) throw error;
    return data;
  }

  // Static method to fetch all reports
  static async getAllReports() {
    const { data, error } = await supabase
      .from('reports')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Static method to fetch a specific report by ID
  static async getReportById(id) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = Report;