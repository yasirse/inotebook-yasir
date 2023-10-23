import React, {useContext} from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/NoteState';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    return (
        <div className="row my-3">
            <h2>You Notes</h2>
            {notes.map((note)=>{
                return <Noteitem note={note}/>  
            })}
        </div>
    )
}

export default Notes