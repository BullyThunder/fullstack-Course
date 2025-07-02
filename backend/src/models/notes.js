if (require.main === module){
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose.connect(url)
  .then(() => {
    // Подключение к базе установлено
    if (process.argv.length === 3) {
      // Только URL .env — показать все заметки
      return Note.find({})
    } else if (process.argv.length === 5) {
      // Добавить новую заметку
      const content = process.argv[3]
      const important = process.argv[4] === 'true'

      const note = new Note({ content, important })
      return note.save()
    } else {
      console.log('Usage:')
      console.log('To list: node notes.js')
      console.log('To add:  node notes.js <content> <important:true|false>')
      process.exit(1)
    }
  })
  .then(result => {
    if (Array.isArray(result)) {
      result.forEach(note => {
        console.log(note)
      })
    } else {
      console.log('Note added:', result)
    }
    return mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error:', error.message)
    mongoose.connection.close()
  })
}