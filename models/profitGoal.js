const { supabase } = require('../db') ;

class ProfitGoal {
  constructor(targetProfit, startDate, endDate, userId) {
    this.targetProfit = targetProfit;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
  }

  async save() {
    const { data, error } = await supabase
      .from('profit_goals')
      .insert([
        {
          target_profit: this.targetProfit,
          start_date: this.startDate,
          end_date: this.endDate,
          user_id : this.userId 
        },
      ]);

    if (error) throw error;
    return data;
  }
}


module.exports = ProfitGoal;
