const supabase = require('../db').supabase;
const Admin = require('../models/admin');

const createAdmin = async (req, res) => {
  try {
    const { name, email, } = req.body;
    const currentAdmin = req.user;

    if (currentAdmin.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can create admins.' });
    }

    const newAdmin = new Admin(name, email, 'admin');
    const { data, error } = await supabase
      .from('admins')
      .insert([{ name: newAdmin.name, email: newAdmin.email, role: newAdmin.role }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAdmin };
