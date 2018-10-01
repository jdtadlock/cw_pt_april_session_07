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
    notes: [],
    logged_in: 0,
    show_form: 0,
    show_overlay: 0,
    is_register: 0,
    email: '',
    password: '',
    show_auth_error: 0,
    error_message: ''
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

  closeForm = (e) => {
    e.preventDefault();

    this.setState({ show_form: 0, show_overlay: 0 });
  }

  showForm = is_register => {

    this.setState({
      is_register: is_register ? 1 : 0,
      show_form: 1, 
      show_overlay: 1,
      show_auth_error: 0,
      error_message: ''
    });
  }  

  toggleAuthType = () => {
    this.setState({
      is_register: !this.state.is_register,
      show_auth_error: 0,
      error_message: ''
    });
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
          show_auth_error: 0,
          error_message: '',
          show_form: 0,
          show_overlay: 0
        });
      } else this.setState({ show_auth_error: 1, error_message: res.data.message });
    }).catch(err => console.log('err', err));
  }

  logOut = () => {
    axios.get('/auth/logout').then(res => {
      this.setState({ user: {}, logged_in: 0 });
    });
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
        {this.state.show_overlay ? <div className="overlay"></div> : ''}

        <Header 
          user={this.state.user} 
          logged_in={this.state.logged_in} 
          showForm={this.showForm}
          logOut={this.logOut} />
    
        <Route path="/" exact render={() => (
          this.state.logged_in ? <Redirect to="/dashboard" /> : <Landing showForm={this.showForm} />
        )} />

        <Route path="/dashboard" render={() => (
          !this.state.logged_in ? <Redirect to="/" /> : <Dashboard />
        )} />

        {this.state.show_form ? <Form 
          is_register={this.state.is_register}
          toggleAuthType={this.toggleAuthType}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          closeForm={this.closeForm}
          authenticate={this.authenticate}
          show_auth_error={this.state.show_auth_error}
          error_message={this.state.error_message} /> : ''}

        {/* {this.state.logged_in ?
         <Route path="/dashboard" component={Dashboard} /> : <Route path="/" component={Landing} /> } */}
        {/* { this.state.logged_in ? <Dashboard /> : <Landing /> } */}
      </Fragment>
    );
  }
}

export default App;
