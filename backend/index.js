const path = require('path');
const express = require('express');
const app = express();

const notesRouter = require('./routes/notes.js');
const personsRouter = require('./routes/persons.js');
const logger = require('./middleware/logger.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(logger);



app.use('/api/notes', notesRouter);
app.use('/api/persons', personsRouter);

app.use(express.static(path.join(__dirname, 'dist')));

// 💡 ВСЕ остальные маршруты — отдать index.html (фронтэнд)
app.get('*', (req, res) => {
  console.log('Serving index.html for:', req.originalUrl);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ✅ Только теперь запускаем сервер
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
