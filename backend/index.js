const express = require('express');
const app = express();
const notesRouter = require('./routes/notes.js');
const personsRouter = require('./routes/persons.js');
const logger = require('./middleware/logger.js')
app.use(express.json());
app.use(logger);
  app.get('/', (request, response) => {
  response.send('<h1>Hi!</h1>')
})
app.use('/api/notes', notesRouter);
app.use('/api/persons', personsRouter);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
