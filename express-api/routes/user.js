const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', (req, res) => {
  res.json(db.users);
});

router.post('/', (req, res) => {
  const { id, name, email, age } = req.body;
  if (!id || !name || !email || !age) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }
  db.users.push({ id, name, email, age });
  res.status(201).json({ message: 'Usuario creado', user: { id, name, email, age } });
});

router.get('/:id', (req, res) => {
  const user = db.users.find(user => user.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

router.put('/:id', (req, res) => {
  const userIndex = db.users.findIndex(user => user.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
  const updatedUser = { ...db.users[userIndex], ...req.body };
  db.users[userIndex] = updatedUser;
  res.json({ message: 'Usuario actualizado', user: updatedUser });
});

router.delete('/:id', (req, res) => {
  const userIndex = db.users.findIndex(user => user.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
  db.users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado' });
});

module.exports = router;
