import React from 'react';
import './NoteForm.css';

const NoteForm = props => (
  <form className={`note column ${props.show_note_form ? 'show' : ''}`}>
    <input 
      value={props.title} 
      onChange={props.handleChange} 
      type="text" 
      placeholder="Title"
      name="title" />
    <textarea 
      value={props.details} 
      onChange={props.handleChange} 
      cols="30" 
      rows="15" 
      placeholder="Details"
      name="details"></textarea>
    <div className="row">
      <button onClick={props.createNote}>Submit</button>
      <button className="cancel" onClick={props.closeNoteForm}>Cancel</button>
    </div>
  </form>
);

export default NoteForm