const Person = require('../src/models/persons.js');
let express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.get('/', (request, response,next) => {
    Person.find({})
    .then(person=>{
      response.json(person)
    })
     .catch(error => {
   next(error);
  })
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
router.get('/:id',(request,response,next)=>{
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
   next(error);
  })
})
router.delete('/:id', (request, response,next) => {
  const id = request.params.id;
  console.log('Received DELETE request for id:', `'${id}'`);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('Invalid ObjectId format');
    return response.status(400).json({ error: 'malformatted id' });
  }

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        console.log('No person found with id:', id);
        return response.status(404).json({ error: 'person not found' });
      }
      console.log('Person deleted:', result);
      response.status(204).end();
    })
   .catch(error => {
   next(error);
  })
});

router.post('/',(request, response,next)=>{
 const {name, number} = request.body;
if (!name || !number) {
  return response.status(400).json({ 
    error: 'name or number missing' 
  });
}
Person.findOne({number})
.then(exisitingPersons =>{
  if(exisitingPersons){
     return response.status(400).json({ 
    error: 'number already used' 
  });
  }
  return Person.findOne({name})
})
.then(exisitingPersons=>{
  if(exisitingPersons){
  return Person.findByIdAndUpdate(
      exisitingPersons._id,
    {number},
    { new: true, runValidators: true, context: 'query' }
  )
  .then(updatedPerson=>{
      response.json(updatedPerson)
  })
  .catch(error=>next(error))
  }
  else{
    const person = new Person({
    name: name, 
    number: number
  })
  person
  .save()
  .then(savePersons=>{
     response.json(savePersons)
  })
}
})
})

module.exports = router;