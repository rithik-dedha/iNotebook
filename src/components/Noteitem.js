import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    return (
        <div className='col-md-3'>
            <div className="card my-100">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash" onClick={() => {
                        deleteNote(note._id);
                        props.ShowAlert("Deleted succesfully", "success")
                    }}></i>
                    <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={() => {
                        updateNote(note);
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem