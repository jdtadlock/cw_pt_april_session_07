import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  render() {
    return (
      <form className="column">
        <h3>{this.props.is_register ? 'Register' : 'Login'}</h3>
        <input 
          type="text" 
          placeholder="Email" 
          value={this.props.email} 
          onChange={this.props.handleChange}
          name="email" />
        <input 
          type="password" 
          placeholder="Password" 
          value={this.props.password} 
          onChange={this.props.handleChange}
          name="password" />
        <button onClick={this.props.authenticate}>Submit</button>
        <div className="toggle row x-center y-center">
          <span>Register</span>
          <div className="toggle-bar" onClick={this.props.toggleFormState}>
            <span className={`${!this.props.is_register ? 'toggle' : ''}`}></span>
          </div>
          <span>Login</span>
        </div>
      </form>
    )
  }
}

export default Form;