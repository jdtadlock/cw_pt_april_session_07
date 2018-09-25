const { Note } = require('../models');

module.exports = app => {
  app.get('/api/notes', (req, res) => {
    Note.findAll().then(notes => {
      res.send({notes: notes});
    });
  });

  app.post('/api/note', (req, res) => {
    Note.create(req.body)
      .then(note => {
        res.send({success: 1, message: 'Note created successfully!'});
      });
  });  
};