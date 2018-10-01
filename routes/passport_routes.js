const { User } = require('../models');
const passport = require('../modules/passport');

module.exports = app => {
  app.get('/auth/isauth', (req, res) => {
    if ( !req.user )
      res.send({ success: 0 });
    else res.send({ success: 1, user: req.user });
  });

  app.post('/auth/register', (req, res) => {
    User.create(req.body)
      .then(user => {
        req.login(user, err => {
          if ( err ) return res.send({ success: 0, message: err });

          res.send({ success: 1, user: req.user });
        });
      }).catch(err => res.send({ success: 0, message: 'User already exists with this email address.' }));
  });

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if ( err ) return res.send({ success: 0, message: err });

      if ( !user ) return res.send({ success: 0, message: 'No account found with this email address.' });

      req.login(user, logErr => {
        if ( logErr ) return res.send({ success: 0, message: 'Login failed.' });

        return res.send({ success: 1, user: user });
      });
    })(req, res, next);
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send({success: 1, message: 'Logged out successfully!'});
  });
}