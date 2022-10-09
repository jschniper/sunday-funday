var express = require('express');
var db = require('../db');
const { QueryTypes } = require('sequelize');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, _next) {
  if (req.query.categoryId) {
    const results = await db.query('SELECT * FROM posts p JOIN categories c on p.categoryId = c.id WHERE c.id = ? ORDER by timeStamp desc', {
      replacements: [req.query.categoryId],
      type: QueryTypes.SELECT,
    });

    res.json(results);
  }
  else {
    const results = await db.query('SELECT * FROM posts p JOIN categories c on p.categoryId = c.id ORDER by timeStamp desc', {
      type: QueryTypes.SELECT,
    });

    res.json(results);
  }
});

router.get('/:id', async function(req, res, _next) {
  const [results] = await db.query('SELECT * FROM posts WHERE ID = ?', {
    replacements: [req.params.id],
    type: QueryTypes.SELECT,
  });

  if (results) {
    res.json(results);
  }
  else {
    res.status(404).json({error: 'Not Found'});
  }
});

router.post('/', async function(req, res, _next) {
  if ('title' in req.body && 'contents' in req.body && 'categoryId' in req.body) {
    // TODO: Fix returning results without a second query
    const [id] = await db.query('INSERT INTO posts (title, contents, categoryId) VALUES (?, ?, ?) RETURNING *', {
      replacements: [req.body.title, req.body.contents, req.body.categoryId],
      type: QueryTypes.INSERT,
    })

    const [results] = await db.query('SELECT * FROM posts WHERE ID = ?', {
      replacements: [id],
      type: QueryTypes.SELECT,
    });

    res.json(results);
  }
  else {
    res.status(400).json({error: 'Missing requireds fields: make sure to include title, contents and categoryId'});
  }
});

router.put('/:id', async function(req, res, _next) {
  if ('title' in req.body && 'contents' in req.body && 'categoryId' in req.body) {
    // TODO: Fix returning results without a second query
    await db.query('UPDATE posts SET title = ?, contents = ?, categoryId = ? WHERE id = ? RETURNING *', {
      replacements: [req.body.title, req.body.contents, req.body.categoryId, req.params.id],
      type: QueryTypes.UPDATE,
    })

    const [results] = await db.query('SELECT * FROM posts WHERE ID = ?', {
      replacements: [req.params.id],
      type: QueryTypes.SELECT,
    });

    res.json(results);
  }
  else {
    res.status(400).json({error: 'Missing requireds fields: make sure to include title, contents and categoryId'});
  }
});

router.delete('/', async function(req, res, _next) {
  await db.query('DELETE FROM posts');

  res.sendStatus(200);
});

router.delete('/:id', async function(req, res, _next) {
  await db.query('DELETE FROM posts where id = ?', {
    replacements: [req.params.id],
    type: QueryTypes.DELETE,
  });

  res.sendStatus(200);
});

module.exports = router;
