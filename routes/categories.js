var express = require('express');
var db = require('../db');
const { QueryTypes } = require("sequelize");
var router = express.Router();

/* GET users listing. */
router.get('/', async function(_req, res, _next) {
  const results = await db.query("SELECT * FROM categories", {
    type: QueryTypes.SELECT,
  });

  res.json(results);
});

module.exports = router;
