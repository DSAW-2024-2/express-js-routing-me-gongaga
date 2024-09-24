const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', (req, res) => {
  res.json(db.orders);
});

router.post('/', (req, res) => {
  const { id, userId, productId, quantity, status } = req.body;
  if (!id || !userId || !productId || !quantity || !status) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  const userExists = db.users.some(user => user.id === userId);
  const productExists = db.products.some(product => product.id === productId);

  if (!userExists || !productExists) {
    return res.status(404).json({ message: 'Usuario o producto no encontrado' });
  }

  db.orders.push({ id, userId, productId, quantity, status });
  res.status(201).json({ message: 'Pedido creado', order: { id, userId, productId, quantity, status } });
});

router.get('/:id', (req, res) => {
  const order = db.orders.find(order => order.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json(order);
});

module.exports = router;
