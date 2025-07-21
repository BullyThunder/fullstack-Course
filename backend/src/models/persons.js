const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: [8, 'Number must be at least 8 characters long'],
    validate: {
      validator: function(v) {
        // Проверка: две части, разделённые дефисом
        // Первая часть: 2 или 3 цифры
        // Вторая часть: как минимум 5 цифр (чтобы длина >= 8)
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});


module.exports = mongoose.model('Person', personSchema)