import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const { toggleAuthLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmitSignup(e){
        e.preventDefault();
        toggleAuthLogin();
        navigate('/profile');
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

        <form onSubmit={handleSubmitSignup}>
        <p>*Invoervelden*</p>
          <button type="submit">Registreer</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;