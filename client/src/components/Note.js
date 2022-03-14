import React, {useState, useEffect} from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import AddNote from "./AddNote";
import "../styles/Note.css";


const Note = (props) => {

    const {user, noteList, setNoteList} = props;
    const [visibleNotes, setVisibleNotes] = useState(6);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${user.username}`,
            { withCredentials:true })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setNoteList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

    const deleteNote = (noteId) => {
        axios.delete(`http://localhost:8000/api/notes/${noteId}`)
        .then((res)=> { 
            console.log(res);
            console.log(res.data);
            setNoteList(noteList.filter((note, index)=>note._id !== noteId))
        })
        .catch((err)=> console.log(err))
    }

    const loadMoreNotes = () => {
        setVisibleNotes((prevValue) => prevValue + 3);
    }

    return(

        <div className="notes-list">

            <AddNote
            noteList= {noteList} 
            setNoteList = {setNoteList}
            />

            {
                noteList.slice(0,visibleNotes).map((note,index)=> (

                    <div key={note._id} className="note">

                        <mark> {note.title} </mark>

                        <p className="note-content">
                            {note.content}
                        </p>

                        <div className= "note-footer">
                                {note.date} <br></br>
                                <MdDeleteForever className="delete-icon" onClick={()=> deleteNote(note._id)}/>
                        </div>

                    </div>
                    
                ))
            }

            <button className="load-more" onClick={loadMoreNotes}> LOAD MORE <br></br> NOTES...</button>

        </div>
    )
}

export default Note;