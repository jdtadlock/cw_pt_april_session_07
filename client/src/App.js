import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Form from './components/Form';


class App extends Component {
  state = {
    user: {},
    logged_in: 0,
    show_form: 0,
    is_register: 1,
    email: '',
    password: '',
    show_auth_error: 0,
    error_message: '',
    show_note_form: 0,
  }

  isAuthenticated = () => {
    axios.get('/auth/isauth')
      .then(res => {
        if ( res.data.success ) {
          this.setState({
            user: res.data.user,
            logged_in: 1
          });
        }
      });
  }

  showForm = is_register => {
    this.setState({
      show_form: 1,
      is_register: is_register ? 1 : 0
    });
  }

  toggleFormState = () => {
    this.setState({
      is_register: !this.state.is_register,
      show_auth_error: 0,
      error_message: ''
    });
  }

  closeForm = (e) => {
    e.preventDefault();

    this.setState({show_form: 0});
  }

  authenticate = (e) => {
    e.preventDefault();

    const url = this.state.is_register ? '/auth/register' : '/auth/login';

    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if ( res.data.success ) {
        this.setState({
          user: res.data.user,
          logged_in: 1,
          show_form: 0,
          show_auth_error: 0,
          error_message: ''
        });
      } else {
        // log in failed
        this.setState({
          error_message: res.data.message,
          show_auth_error: 1
        });
      }
    });
  }

  logOut = () => {
    axios.get('/auth/logout')
      .then(res => {
        this.setState({
          logged_in: 0,
          user: {}
        });
      });
  }

  showNoteForm = (e) => {
    e.preventDefault();

    this.setState({show_note_form: 1});
  }

  closeNoteForm = (e) => {
    if (e) e.preventDefault();

    this.setState({ show_note_form: 0 });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount = () => {
    this.isAuthenticated();
  }
  
  render() {
    return (
      <Fragment>
        <Header
          logged_in={this.state.logged_in}
          user={this.state.user}
          closeForm={this.closeForm}
          showForm={this.showForm}
          logOut={this.logOut}
          showNoteForm={this.showNoteForm}
           />
    
       <div className="content">
          <Route path="/" exact render={() => (
            this.state.logged_in ? <Redirect to="/dashboard" /> : <Landing showForm={this.showForm} />
          )} />

          <Route path="/dashboard" render={() => (
            !this.state.logged_in ? <Redirect to="/" /> : <Dashboard 
              show_note_form={this.state.show_note_form}
              closeNoteForm={this.closeNoteForm} />
          )} />

          {this.state.show_form ? <Form
            is_register={this.state.is_register}
            toggleFormState={this.toggleFormState}
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
            authenticate={this.authenticate}
            closeForm={this.closeForm}
            show_auth_error={this.state.show_auth_error}
            error_message={this.state.error_message} /> : ''}

          
       </div>

      </Fragment>
    );
  }
}

export default App;
