const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);

router.get('/employees/random', EmployeesController.getRandom);

router.get('/employees/:id', EmployeesController.getEmploId);

router.post('/employees', EmployeesController.postEmplo);

router.put('/employees/:id', EmployeesController.putEmplo);

router.delete('/employees/:id', EmployeesController.deleteEmplo);

module.exports = router;
