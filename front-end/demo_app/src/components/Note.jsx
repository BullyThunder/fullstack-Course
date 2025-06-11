const Note = ({ note,toggleImportance,deleteNoteElement }) => {
  const label = note.important 
   ? 'make not important' : 'make important'
    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
        <button onClick={deleteNoteElement}>Delete</button>
      </li>
    )
  }
  

  export default Note;