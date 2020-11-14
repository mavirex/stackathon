const router = require('express').Router();
const brcypt = require('bcrypt');
const hash = require('../hash');
const {
    User, Session, Rank, CachedQuestion 
} = require('../db');

const A_WEEK_IN_SECONDS = 1000 * 60 * 60 * 24 * 7;

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
            username,
            },
            include: [Session, Rank, CachedQuestion],
        });
        if (!user) {
            throw new Error('Username not recognized');
        } else {
            const comparisonResult = await brcypt.compare(password, user.password);
            if (!comparisonResult) {
                throw new Error('Password not recognized');
            } else {
                if (user.session) {
                    res.cookie('sid', user.session.uuid, {
                        maxAge: A_WEEK_IN_SECONDS,
                        path: '/'
                    })
                } else {
                    const newSession = await Session.create()
                    user.setSession(newSession.id)
                    res.cookie('sid', newSession.uuid, {
                        maxAge: A_WEEK_IN_SECONDS,
                        path: '/'
                    })
                }
                res.status(201).send(user)
            }
        }
    } catch (err) {
        next(err);
    }
})

router.post('/create', async (req, res, next) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const hashedPassword = await hash(password)
        const newSession = await Session.create()
        const user = await User.create({
            firstName, 
            lastName,
            email,
            username,
            password: hashedPassword,
            rankId: 1,
            sessionId: newSession.id
            }, 
            {include: [Session, Rank, CachedQuestion]}
        );
        res.cookie('sid', newSession.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/'
        }).status(201).send(user)
    } catch (err) {
        next(err);
    }
})

router.post('/mount', async (req, res, next) => {
    try {
      if (req.cookies.sid) {
        console.log("We have a cookie")
        const refreshedSession = await Session.findOne({
            where: {
                uuid: req.cookies.sid
            }
        });
        if (refreshedSession) {
            const sessionId = refreshedSession.id
            const user = await User.findOne({
                where: {
                sessionId,
                },
                include: [Session, Rank, CachedQuestion],
            });
            res.cookie('sid', refreshedSession.uuid, {
                maxAge: A_WEEK_IN_SECONDS,
                path: '/',
            }).send(user);
        } else {
            res.sendStatus(204)
        }
      } else {
        res.sendStatus(204)
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router
