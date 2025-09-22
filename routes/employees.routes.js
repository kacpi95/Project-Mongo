const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Employee = require('../models/employees.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not Found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not Found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;

  req.db
    .collection('employees')
    .insertOne(
      { _id: ObjectId(req.params.id) },
      { firstName: firstName, lastName: lastName }
    )
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;

  req.db
    .collection('employees')
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { firstName: firstName, lastName: lastName } }
    )
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).jason({ message: err });
    });
});

router.delete('/employees/:id', (req, res) => {
  req.db
    .collection('employees')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
