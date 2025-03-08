const { supabase } = require('../db');
const dayjs = require('dayjs'); // Import dayjs for date manipulation

// Helper function to fetch data for a given start and end date
const fetchData = async (startDate, endDate, tableName, dateColumn) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('amount, ' + dateColumn) // Select amount and the date column
    .gte(dateColumn, startDate) // Apply start date filter
    .lte(dateColumn, endDate); // Apply end date filter
  if (error) throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
  return data;
};

const getReport = async (req, res) => {
  try {
    const { year, month } = req.query; // Query parameters for year and month

    let startDate, endDate;

    if (year) {
      // Yearly report (for a specific year, e.g., 2025)
      startDate = dayjs().year(year).startOf('year').format('YYYY-MM-DD');
      endDate = dayjs().year(year).endOf('year').format('YYYY-MM-DD');
    } else if (month) {
      // Monthly report (for a specific month in 2025)
      startDate = dayjs().year(2025).month(month - 1).startOf('month').format('YYYY-MM-DD');
      endDate = dayjs().year(2025).month(month - 1).endOf('month').format('YYYY-MM-DD');
    } else {
      // Default response if no year or month is provided (can be removed if not needed)
      return res.status(400).json({ error: 'Year or month parameter is required.' });
    }

    // Fetch fixed income data for the period
    const fixedIncomes = await fetchData(startDate, endDate, 'fixed_income', 'date');
    // Fetch recurring income data for the period
    const recurringIncomes = await fetchData(startDate, endDate, 'recurring_income', 'start');
    // Fetch fixed expenses data for the period
    const fixedExpenses = await fetchData(startDate, endDate, 'fixed_expense', 'date');
    // Fetch recurring expenses data for the period
    const recurringExpenses = await fetchData(startDate, endDate, 'recurring_expense', 'start');
    // Fetch profit goals for the period
    const profitGoals = await fetchData(startDate, endDate, 'profit_goals', 'goal_date');

    // Calculate total income and expenses for the period
    const totalIncome =
      fixedIncomes.reduce((sum, income) => sum + income.amount, 0) +
      recurringIncomes.reduce((sum, income) => sum + income.amount, 0);

    const totalExpenses =
      fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0) +
      recurringExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const netProfit = totalIncome - totalExpenses;

    // Calculate total profit goals
    const totalProfitGoals = profitGoals.reduce((sum, goal) => sum + goal.goal, 0);

    // Return the report data for the specified period
    res.status(200).json({
      totalIncome,
      totalExpenses,
      netProfit,
      totalProfitGoals,
      timePeriod: { startDate, endDate },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getReport };
