const { supabase } = require('../db');

class ProfitGoal {
  constructor(targetProfit, startDate, endDate, userId) {
    this.targetProfit = targetProfit;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
  }

  async save() {
    console.log("Saving profit goal:", this);  // ✅ Debugging

    const { data, error } = await supabase
      .from('profit_goals')  // Ensure table name is correct
      .insert([
        {
          target_profit: this.targetProfit,  // ✅ Matches Supabase column
          start_date: this.startDate,        // ✅ Matches Supabase column
          end_date: this.endDate,            // ✅ Matches Supabase column
          user_id: this.userId               // ✅ Matches Supabase column
        },
      ])
      .select('*'); // Return inserted data

    if (error) {
      console.error("Error saving profit goal:", error);
      throw new Error(error.message);
    }

    return data;
  }
}

module.exports = ProfitGoal;
