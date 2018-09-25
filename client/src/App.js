import React, { Component } from 'react';
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
    show_form: 1,
    is_register: 1,
    email: '',
    password: ''
  }

  isAuthenticated = () => {
    axios.get('/isauth')
      .then(res => {
        
      });
  }

  showForm = () => {
    this.setState({show_form: 1});
  }

  toggleFormState = () => {
    this.setState({is_register: !this.state.is_register});
  }

  authenticate = (e) => {
    e.preventDefault();
    const url = this.state.is_register ? '/auth/register' : '/auth/login';

    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      console.log(res.data);
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
      <div>
        <Header />
    
        <Route path="/" exact render={() => (
          this.state.logged_in ? <Redirect to="/dashboard" /> : <Landing showForm={this.showForm} />
        )} />

        <Route path="/dashboard" render={() => (
          !this.state.logged_in ? <Redirect to="/" /> : <Dashboard />
        )} />

        {this.state.show_form ? <Form 
          is_register={this.state.is_register}
          toggleFormState={this.toggleFormState}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          authenticate={this.authenticate}  /> : ''}

        {/* {this.state.logged_in ?
         <Route path="/dashboard" component={Dashboard} /> : <Route path="/" component={Landing} /> } */}
        {/* { this.state.logged_in ? <Dashboard /> : <Landing /> } */}
      </div>
    );
  }
}

export default App;
