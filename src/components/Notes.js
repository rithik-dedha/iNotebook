import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const ref = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag:""})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        setShow(false)
        props.ShowAlert("Updated successfully", "success")

    };
    const handleShow = () => setShow(true);

    let history = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes()
            // eslint-disable-next-line
        }
        else
        {
            history("/login")
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    // const handleClick = (e)=>{
    //     e.preventDefault()
    // }
    const onChange = (e)=>{
        // ----------------------------------- the following syntax is important  -------------------------------------------------------
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote ShowAlert = {props.ShowAlert}/>

            <Button variant="primary" ref={ref} onClick={handleShow} style={{ display: "none" }}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" value = {note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <input type="text" value = {note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" value = {note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                        </div>
                        {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose2} disabled = {note.etitle.length<5 || note.edescription.length<5}>
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container row my-3">
                <h1>Your Notes</h1>
                <div className='container mx-3'>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} ShowAlert={props.ShowAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
