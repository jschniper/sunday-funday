var express = require('express');
var db = require('../db');
const { QueryTypes } = require('sequelize');
var router = express.Router();
const { Category } = require('../models/models');

/* GET users listing. */
router.get('/', async function(_req, res, _next) {
  const results = await Category.findAll();

  res.json(results);
});

module.exports = router;
