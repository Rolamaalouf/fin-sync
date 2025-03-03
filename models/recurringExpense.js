const { supabase } = require('../db');

class RecurringExpense {
  constructor(title, frequency, description, amount, currency, start, finish, categoryId, userId) {
    this.title = title;
    this.frequency = frequency;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.start = start;
    this.finish = finish;
    this.categoryId = categoryId; // Internal naming
    this.userId = userId; // Internal naming
  }

  async save() {
    const { data, error } = await supabase
      .from('recurrentExpense')
      .insert([
        {
          title: this.title,
          frequency: this.frequency,
          description: this.description,
          amount: this.amount,
          currency: this.currency,
          start: this.start,
          finish: this.finish,
          category_id: this.categoryId, // Ensure it matches Supabase column name
          user_id: this.userId, // Ensure it matches Supabase column name
        }
      ]);

    if (error) throw error;
    return data;
  }

  static async getAllRecurringExpenses() {
    const { data, error } = await supabase.from('recurrentExpense').select('*');
    if (error) throw error;
    return data;
  }

  static async getRecurringExpenseById(id) {
    const { data, error } = await supabase.from('recurrentExpense').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }
}

module.exports = RecurringExpense;
