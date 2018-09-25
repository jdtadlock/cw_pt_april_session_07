const { User } = require('../models');
const passport = require('../modules/passport');

module.exports = app => {
  app.get('/isauth', (req, res) => {
    if ( !req.user )
      res.send({success: 0});
    else res.send({success: 1, user: req.user});
  });

  app.post('/auth/register', (req, res) => {
    User.create(req.body)
      .then(user => {
        req.logIn(user, (err) => {
          if ( err ) return console.log(err);

          res.send({ user: req.user, success: 1 });
        });
        
      });
  });

  app.post('/auth/login', (req, res) => {
    passport.authenticate('local')(req, res, result => {
      res.send({ user: req.user, success: 1 });
    });
  });
}