import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function SignIn() {
    const { toggleAuthLogin } = useContext(AuthContext);
    const { toggleAuthLogout } = useContext(AuthContext);
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmitLogin(e){
        e.preventDefault();
        toggleAuthLogin();
        navigate('/profile');
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
        {!isAuth ? (
            <>
                <form onSubmit={handleSubmitLogin}>
                    <label htmlFor="name">Naam:</label>
                <input id="name "type="text"/>
                    <label htmlFor="email">E-mail adres:</label>
                    <input id="email" type="email"/>
                <button type="submit">Inloggen</button>
            </form>

                <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
            </>
        ) : (
            <>
                <p>Je bent al ingelogd.</p>
                <button type="button" onClick={()=> toggleAuthLogout()}>
                    Log uit
                </button>
            </>
            )}

    </>
  );
}

export default SignIn;