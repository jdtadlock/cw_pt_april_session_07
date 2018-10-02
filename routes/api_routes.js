const { Note, User } = require('../models');

module.exports = app => {
  app.get('/api/notes', (req, res) => {
    User.findOne({
      where: {
        id: req.user.id
      }, 
      include: [Note]
    }).then(user => {
      res.send({notes: user.Notes});
    });
  });

  app.post('/api/note', (req, res) => {
    User.findOne({
      where: { id: req.user.id }
    }).then(user => {
      user.createNote(req.body)
        .then(note => {
          res.send({ success: 1, note: note });
        });
    });
  });  
};