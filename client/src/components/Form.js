import React from 'react';
import './Form.css';

const Form = props => (
  <form className="column">
    <h3>{props.is_register ? 'Register' : 'Login'}</h3>
    {props.show_auth_error ? <p className="error">{props.error_message}</p> : ''}
    <input
      type="text"
      placeholder="Email"
      value={props.email}
      onChange={props.handleChange}
      name="email" />
    <input
      type="password"
      placeholder="Password"
      value={props.password}
      onChange={props.handleChange}
      name="password" />
    <div className="row">
      <button onClick={props.authenticate}>Submit</button>
      <button className="cancel" onClick={props.closeForm}>Cancel</button>
    </div>
    <div className="toggle row x-center y-center">
      <span>Login</span>
      <div className="toggle-bar" onClick={props.toggleAuthType}>
        <span className={`${props.is_register ? 'toggle' : ''}`}></span>
      </div>
      <span>Register</span>
    </div>
  </form>
);

export default Form;