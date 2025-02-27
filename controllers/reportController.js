const supabase = require('../db').supabase;
const Report = require('../models/report');

const getYearlyReport = async (req, res) => {
  try {
    const year = req.params.year;
    const { data: incomes, error: incomeError } = await supabase
      .from('fixed_incomes')
      .select('amount')
      .eq('date', year);
    const { data: expenses, error: expenseError } = await supabase
      .from('fixed_expenses')
      .select('amount')
      .eq('date', year);

    if (incomeError || expenseError) throw incomeError || expenseError;

    const report = {
      incomes: incomes.reduce((acc, curr) => acc + curr.amount, 0),
      expenses: expenses.reduce((acc, curr) => acc + curr.amount, 0),
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getYearlyReport };
