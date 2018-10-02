import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Dashboard.css';

import NoteForm from './NoteForm';

class Dashboard extends Component {
  state = {
    notes: [],
    title: '',
    details: ''
  }  

  getNotes = () => {
    axios.get('/api/notes')
      .then(res => this.setState({ notes: [...res.data.notes] }));
  }

  createNote = (e) => {
    e.preventDefault();

    axios.post('/api/note', {
      title: this.state.title,
      details: this.state.details
    }).then(res => {
      this.setState({
        show_note_form: 0
      });
      
      this.props.closeNoteForm();
      this.getNotes();
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount = () => {
    this.getNotes();
  }

  render() {
    return(
      <Fragment>
        <div className="notes row">
          {this.state.notes.map(note => (
            <div className="note" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.details}</p>
            </div>
          ))}
        </div>

        <NoteForm
          show_note_form={this.props.show_note_form}
          closeNoteForm={this.props.closeNoteForm}
          title={this.state.title}
          details={this.state.details}
          handleChange={this.handleChange}
          createNote={this.createNote} />
      </Fragment>
    )
  }
}

export default Dashboard;