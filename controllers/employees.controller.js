const Employee = require('../models/employees.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand);
    if (!employee) res.status(404).json({ message: 'Not Found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getEmploId = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) res.status(404).json({ message: 'Not Found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postEmplo = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    const updateEmployee = await Employee.findById(newEmployee._id).populate(
      'department'
    );
    res.json(updateEmployee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putEmplo = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true }
    ).populate('department');
    if (!employee) res.status(404).json({ message: 'Not Found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteEmplo = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) res.status(404).json({ message: 'Not Found' });
    else res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
