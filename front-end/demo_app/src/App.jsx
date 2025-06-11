import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Note from './components/Note.jsx';
import noteService from './services/notes.js';
import Notification from './components/Notification.jsx';
import Complete from './components/Complete.jsx';
import ErrorMessage from './components/Error_mes.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newNote, setNewNote] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [completeMessage,setCompleteMessage] = useState(null);
  const [errorPersonsMessage, setErrorPersonsMessage] = useState(null);


  useEffect(() => {
    Promise.all([noteService.getAll(), noteService.getAllpersons()])
      .then(([notesResponse, personsResponse]) => {
        setNotes(notesResponse);
        setPersons(personsResponse);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const addNewPerson = (event,id) => {
    event.preventDefault();
    const nameExist = persons.some(item => item.name === newName);
    const numberExist = persons.some(item => item.number === newNumber);
    if (!newName || !newNumber){
       alert('Please fill in both name and number');
      return;
    }
    if (numberExist) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    if( nameExist){
        const isConfirmedNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if(isConfirmedNumber){
          const findPerson = persons.find(per => per.name === newName);
          const findId = findPerson.id;
          const editPersons = {...findPerson,number: newNumber};
          noteService.updatePersons(findId,editPersons).
          then(returnedsPersons=>{
             setPersons(persons.map(person =>person.id === returnedsPersons.id ?  returnedsPersons: person));
             setPersons(persons.filter(item => item.id !== findId))
             setNewName('');
          setNewNumber('');
          })
          .catch(error=>{
            console.log(error);
            setErrorPersonsMessage(`Information of ${newName} has already been removed from server `)
            setTimeout(() => {
          setErrorPersonsMessage(null)
        }, 8000)
         setPersons(persons.filter(item => item.id !== findId))
            setNewName('');
          setNewNumber('');
          })
          return;
        }
         else{
          alert('Cancel');
          setNewName('');
          setNewNumber('');
          return;
    }
    }
    const newPerson = { name: newName, number: newNumber };
    noteService.createPersons(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setCompleteMessage(`Added ${newName}`)
        setTimeout(() => {
          setCompleteMessage(null)
        }, 2000)
        setNewName('');
        setNewNumber('');
      })
      .catch(error=>{
        console.log(error);
        setErrorPersonsMessage(`Information of ${newName} has already been removed from server `)
        setTimeout(() => {
          setErrorPersonsMessage(null)
        }, 2000)
      })
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    };

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes([...notes, returnedNote]);
        setNewNote('');
      });
  };

  const searchContact = () => {
    const result = persons.filter(item =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setSearchResult(result);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id === id ? returnedNote : n));
      })
    .catch(error=>{
      setErrorMessage(`Note '${note.content}' was already removed from server`)
    })
    setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
         setNotes(notes.filter(n => n.id !== id))
  };

  const deleteContact = (id) => {
   const findPersons = (persons.find(c => c.id === id))
    const isConfirmed = window.confirm(`Delete ${findPersons.name}?`);
    if(isConfirmed){
    noteService.deleteElementPersons(id)
      .then(() => {
        setPersons(persons.filter(c => c.id !== id));
      });
  }
    else{
       console.log("Not deleted");
    }
  }
  const deleteNote = (id) => {
    noteService.deleteElement(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='app-container'>
      <div>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={searchContact}>Search</button>
      </div>
      <ul>
        {searchResult.length > 0 ? (
          searchResult.map((item, index) => (
            <li key={index}>{item.name} - {item.number}</li>
          ))
        ) : (
          <li>Nothing found</li>
        )}
      </ul>

      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <Complete
          message={completeMessage}
          />
          <Notification
          message={errorMessage} 
          />
          <ErrorMessage
          message={errorPersonsMessage} 
          />
        </div>
        <div>
          <button onClick={addNewPerson}>add Person</button>
          <div>
            note:
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
          </div>
        </div>
        
      </form>
    <button onClick={addNote}>add Note</button>
      <h2>Notes</h2>
      <Notification 
      message={errorMessage}
      />
      <ul>
        {notes.map((item, index) => (
          <Note
            key={index}
            note={item}
            toggleImportance={() => toggleImportanceOf(item.id)}
            deleteNoteElement={() => deleteNote(item.id)}
          />
        ))}
        
      </ul>

      <h2>Numbers</h2>
      <ul>
        {persons.map((item, index) => (
          <li key={index}>
            {item.name} - {item.number}
            <button onClick={() => deleteContact(item.id)}>Delete Contact</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
