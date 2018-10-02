import React from 'react';
import './Header.css';

const Header = props => (
  <header className="row split">
    <h3>NoteWiz</h3>

    <nav>
      {props.logged_in ? <button onClick={props.showNoteForm}>Create Note</button> : ''}
      <span onClick={() => props.logged_in ? props.logOut() : props.showForm(0)}>{props.logged_in ? 'Log Out' : 'Login'}</span>
    </nav>
  </header>
);

export default Header;