import React from 'react';

import { login } from 'src/api/auth';

export default function Login() {
  return (
    <>
      {/* <button id="sign-out" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
        Sign-out
      </button> */}
      <button
        onClick={login}
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
        <i class="material-icons">account_circle</i>Sign-in with Google
      </button>
    </>
  );
}