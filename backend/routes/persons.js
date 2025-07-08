const Person = require('../src/models/persons.js');
let express = require('express');
const router = express.Router();
router.get('/', (request, response) => {
    Person.find({})
    .then(person=>{
      response.json(person)
    })
     .catch(error => {
      response.status(500).json({ error: 'Error for download persons' });
    });
 })
router.get('/info', (request, response) => {
    const date = new Date();
  Person.countDocuments({})
  .then(count=>{ response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
  
})
});
router.get('/:id',(request,response)=>{
  const id = request.params.id
  Person.findById(id).
  then(person=>{
  if(person){
    response.json(person)
  }
 else{
  response.status(404).end()
 }
})
.catch(error => {
    response.status(400).json({ error: 'Неверный формат id' });
  })
})
router.delete('/:id',(request,response)=>{
  const id = request.params.id;
  Person.findByIdAndRemove(id)
  .then(()=>{
    response.status(204).end()
    })
  .catch(()=>{
    response.status(404).json({ error: 'Invalid id format' });
  })  
})
router.post('/',(request, response)=>{
 let body = request.body;
if (!body.name || !body.number) {
  return response.status(400).json({ 
    error: 'name or number missing' 
  });
}
  
 const person = new Person({
    name: body.name, 
    number: body.number
  })
  person.save()
  .then(savePersons=>{
     response.json(savePersons)
  })
  .catch(error=>{
     response.status(500).json({ error: 'Error saved person' });
});
})

module.exports = router;