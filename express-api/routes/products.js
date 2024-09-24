const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', (req, res) => {
  res.json(db.products);
});

router.post('/', (req, res) => {
  const { id, name, price, category } = req.body;
  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }
  db.products.push({ id, name, price, category });
  res.status(201).json({ message: 'Producto creado', product: { id, name, price, category } });
});

router.get('/:id', (req, res) => {
  const product = db.products.find(product => product.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
});

router.put('/:id', (req, res) => {
  const productIndex = db.products.findIndex(product => product.id === req.params.id);
  if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado' });
  const updatedProduct = { ...db.products[productIndex], ...req.body };
  db.products[productIndex] = updatedProduct;
  res.json({ message: 'Producto actualizado', product: updatedProduct });
});

router.delete('/:id', (req, res) => {
  const productIndex = db.products.findIndex(product => product.id === req.params.id);
  if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado' });
  db.products.splice(productIndex, 1);
  res.json({ message: 'Producto eliminado' });
});

module.exports = router;
