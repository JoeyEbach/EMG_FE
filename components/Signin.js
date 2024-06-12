import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  document.querySelector('body').setAttribute('data-theme', 'home');

  return (
    <div>
      <h1 className="heading center" style={{ marginTop: '225px' }}>Welcome to EMG!</h1>
      <p className="info center" style={{ marginBottom: '15px' }}>The artist, songwriter, producer connection hub.</p>
      <p className="info center" style={{ marginBottom: '5px' }}>Click the button below to login!</p>
      <Button type="button" className="copy-btn signIn center" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
