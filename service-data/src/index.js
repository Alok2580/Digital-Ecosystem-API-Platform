require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'secret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/items';

let items;

MongoClient.connect(MONGO_URI)
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db();
    items = db.collection('items');
  })
  .catch(err => console.error(err));

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.use(authMiddleware);

app.get('/items', async (req, res) => {
  const list = await items.find().toArray();
  res.json(list);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const result = await items.insertOne({ name, owner: req.user.username });
  res.status(201).json({ _id: result.insertedId, name });
});

app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  await items.deleteOne({ _id: new ObjectId(id) });
  res.json({ deleted: id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Data service running on port ${PORT}`));
