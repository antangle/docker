const express = require('express');
const { getUser, getUserById, createUser, updateUser, deleteUser, createTable } = require('../user/api');

const router = express.Router();

router.get('/table', createTable);

router.get('/user', getUser);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

module.exports = router;