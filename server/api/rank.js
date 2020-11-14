const router = require('express').Router();
const {
    User, Rank
  } = require('../db');

  router.get('/', async (req, res, next) => {
    try {
      const ranks = await Rank.findAll({
        include: [User],
      });
      res.send(ranks);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;