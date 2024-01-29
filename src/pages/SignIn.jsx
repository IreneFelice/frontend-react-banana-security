import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";



function SignIn() {
    const { login } = useContext(AuthContext);

    // Hier wordt post request gedaan bij inloggen. De token die terugkomt wordt afgehandeld in Context
    // Nodig:
    // - async await
    // - request
    // - try / catch blok
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/login', {
                email: "klaas@novi.nl",
                password: "123456",

            });
            console.log(response.data.accessToken);
            login(response.data.accessToken);
        } catch(e) {
            console.error(e);

        }

    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <p>*invoervelden*</p>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;