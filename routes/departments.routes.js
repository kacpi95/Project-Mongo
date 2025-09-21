const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/departments', (req, res) => {
  req.db
    .collection('departments')
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/departments/random', (req, res) => {
  req.db
    .collection('departments')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      req.status(500).json({ message: err });
    });
});

router.get('/departments/:id', (req, res) => {
  req.db
    .collection('departments')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db
    .collection('departments')
    .insertOne({ name: name })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put('/departments/:id', (req, res) => {
  req.db
    .collection('/departments/:id')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name } })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.delete('/departments/:id', (req, res) => {
  req.db
    .collection('/departments/:id')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      req.json({ message: 'OK' }).catch((err) => {
        res.status(500).json({ message: err });
      });
    });
});

module.exports = router;
