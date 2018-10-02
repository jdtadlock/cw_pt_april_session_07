import React from 'react';
import './Landing.css';

const Landing = props => (
  <div className="landing column y-center x-center">
      <div className="hero column y-center">
        <h1>The Ultimate In Note Taking</h1>
        <button onClick={props.showForm}>Sign Up Now To Get Started!</button>
      </div>
  </div>
);

export default Landing;