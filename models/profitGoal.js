const { supabase } = require('../db').supabase;

class ProfitGoal {
  constructor(targetProfit, startDate, endDate) {
    this.targetProfit = targetProfit;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  async save() {
    const { data, error } = await supabase
      .from('profit_goals')
      .insert([
        {
          target_profit: this.targetProfit,
          start_date: this.startDate,
          end_date: this.endDate,
          created_by: this.createdBy, 
        },
      ]);

    if (error) throw error;
    return data;
  }
}

module.exports = ProfitGoal;
