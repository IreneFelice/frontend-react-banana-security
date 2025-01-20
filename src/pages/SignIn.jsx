import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function SignIn() {
    const { toggleAuthNow } = useContext(AuthContext);
    const { isAuth } = useContext(AuthContext);

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
        {!isAuth ? (
            <>
                <form>
                <p>*invoervelden*</p>
                <button type="button" onClick={()=> toggleAuthNow()}>Inloggen</button>
            </form>

                <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
            </>
        ) : (
            <>
                <p>Je bent al ingelogd.</p>
                <button type="button" onClick={()=> toggleAuthNow()}>
                    Log uit
                </button>
            </>
            )}

    </>
  );
}

export default SignIn;