const router = require('express').Router();
const {
    User, Session, Rank, CachedQuestion
  } = require('../db');

router.put('/:id', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id, {
      include: [Session, Rank, CachedQuestion]
    })
    await user.update(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})


  // router.get('/', async (req, res, next) => {
  //   try {
  //     const users = await User.findAll({
  //       include: [Session, Rank, CachedQuestion],
  //     });
  //     res.send(users);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

module.exports = router;
