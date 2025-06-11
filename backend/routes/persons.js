let persons = require('../data/persons.js');
let generateId = require('../utils/generate_id.js');
let express = require('express');
const router = express.Router();
router.get('/', (request, response) => {
    
    response.json(persons);
 })
router.get('/info', (request, response) => {
  const date = new Date();
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `);
});
router.get('/:id',(request,response)=>{
  const id_per = Number(request.params.id);
  const person = persons.find(pers => pers.id === id_per);
  if(person){
    response.json(person)
  }
 else{
  response.status(404).end()
 }
})
router.delete('/:id',(request,response)=>{
  const id_per = Number(request.params.id);
  const person_index = persons.findIndex(item => item.id === id_per);
  if(person_index!==-1){
    persons.splice(person_index,1);
     response.status(204).end(); // 204 No Content
  }
  else {
     response.status(404).json({ error: 'Contact not found' });
  }
})
router.post('/',(request, response)=>{
 let body = request.body;
  let body_Name = body.name;
  let findName = persons.find(item => item.name === body_Name);
  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if(findName){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
 const person = {
    id: generateId(persons),
    name: body.name, 
    number: body.number
  }
  persons = [...persons,person]
  response.json(person)
})

module.exports = router;