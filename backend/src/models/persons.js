if (require.main === module){
const mongoose = require('mongoose');


const url = process.env.MONGODB_URI;


mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    // В этот момент подключение успешно, можно работать с базой

    if(process.argv.length === 3){
      return Person.find({})
    } else if (process.argv.length === 5) {
      const name = process.argv[3]
      const number = process.argv[4]
      const person = new Person({ name, number })
      return person.save()
    } else {
      console.log('Usage:')
      console.log('To list: node persons.js')
      console.log('To add: node persons.js <name> <number>')
      process.exit(1)
    }
  })
  .then(result => {
    if (Array.isArray(result)) {
      result.forEach(person => console.log(person))
    } else {
      console.log('Added:', result.name, result.number)
    }
    return mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error:', error.message)
    mongoose.connection.close()
  })
}


