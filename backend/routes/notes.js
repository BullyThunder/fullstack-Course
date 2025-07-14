const Note = require('../src/models/notes.js') // Mongoose модель
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
   .catch(error => next(error))
});
router.get('/:id', (request, response,next) => {
  const id = request.params.id;
  Note.findById(id)
  .then(note=>{
    if(note){
    response.json(note)
    }
     else{
    request.status(404).end()
  }
  })
  .catch(error => {
   next(error);
  })
})
router.post('/',(request,response)=>{
  const body = request.body;
  if(!body.content){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const note = new Note ({ 
    content: body.content,
    important: body.important || false,
  });
  note.save()
  .then(savedNote=>{
    response.json(savedNote)
  })
 .catch(error => next(error))
})

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  Note.findByIdAndRemove(id)
  .then(()=>{
     response.status(204).end();
  })
  .catch(error => next(error))
})

module.exports = router;