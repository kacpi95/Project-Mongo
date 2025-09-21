const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/employees', (req, res) => {
  req.db
    .collection('employees')
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      req.json(500).json({ message: err });
    });
});

router.get('/employees/random', (req, res) => {
  req.db
    .collection('employees')
    .aggregate([{ size: 1 }])
    .toArray()
    .then((data) => res.json(data[0]));
});

router.get('/employees/:id', (req, res) => {
  req.db
    .collection('employees')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
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
