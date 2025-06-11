 let notes = require('../data/notes.js')
const generateId = require('../utils/generate_id.js');
const express = require('express');
let router = express.Router();
router.get('/',(request, response)=>{
  response.json(notes);
})
router.get('/:id', (request, response) => {
  const id = request.params.id;
  const note =  notes.find(note => note.id === id)
  if(note){
    response.json(note)
  }
 else{
  response.status(404).end()
 }
})
router.post('/',(request,response)=>{
  const body = request.body;
  if(!body.content){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const note = { 
    content: body.content,
    important: body.important || false,
    id: generateId()
  }
  notes = [...notes,note];
  console.log(note)
  response.json(note) 
})

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  const notes =  notes.filter(note => note.id !== id)
  response.status(204).end()
})

module.exports = router;