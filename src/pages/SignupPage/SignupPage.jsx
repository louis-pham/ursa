import React, { useState, useEffect } from 'react';

import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

function SignupPage(props) {
  const [message, setMessage] = useState("");

  const updateMessage = (msg) => {
    setMessage(msg);
  }

  useEffect(() => {
    if (message) {
      props.notify("error", message);
    }
  }, [message]);

  return (
    <div className='SignupPage'>
      <SignupForm {...props} updateMessage={updateMessage} />
    </div>
  );
}

export default SignupPage;
