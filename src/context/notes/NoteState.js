import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  const host="http://localhost:5000";
    const notesInitial = [];
      const [notes, setNotes] = useState(notesInitial);
// Fetch all Note
    const getNotes = async (title, description, tag)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
        }
      });
      const  json=await response.json();
      setNotes(json); 
    }

       // Add a Note
       const addNote = async (title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const  json= await response.json();
        console.log(json._id)
        const note = {
          "_id": json._id,
          "user": "6131dc5e3e4037cd4734a0664",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        };
        setNotes(notes.concat(note)) 
      }

      // Delete a Note
      const deleteNote = async(id)=>{
        console.log("Deleting note with id="+id);
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
          }
        });
        const  json= await response.json();
        console.log(json);
        const newNotes=notes.filter((note)=>{return (id!==note._id) });
        setNotes(newNotes);
      }

      // Edit a Note
      const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const  json= response.json();

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id)
          {
            element.title=title;
            element.description=description;
            element.tag=tag;
          }          
        }
      }
      return (
        <NoteContext.Provider value={{notes, setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;