import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  const host="http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [error1, setError] = useState({errorCode:""});
    // Fetch all Note
  const getNotes = async (title, description, tag)=>{
    //API Call
    try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
          }
        });
        const  json=await response.json();
        setNotes(json); 
        
      } catch (error) {
        console.log(error.statusCode);
        setError({errorCode:error.name==="TypeError"?"Server not responding":"Error occurred"});
        }
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
        //console.log(json._id)
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
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
          }
        });
        const  json= await response.json();
        //console.log(json);
        const newNotes=notes.filter((note)=>{return (id!==note._id) });
        setNotes(newNotes);
      }

      // Edit a Note
      const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGU2Y2EyMjc3MWVjNmIzOWVmMzQ2In0sImlhdCI6MTY5NzcwNzY2NX0.Z_XBV3b-mRlLH7hCEs7j5yDo-wtl30OG39JDV_rA6k4"
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const  json= await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id)
          {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }          
        }
        setNotes(newNotes);
      }
      return (
        <NoteContext.Provider value={{error1,notes, setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;