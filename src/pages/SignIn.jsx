import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function SignIn() {
    const { login } = useContext(AuthContext);
    const { logout} = useContext(AuthContext);
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors}} = useForm();

    async function handleSubmitLogin(inputData) {

        try {
            const response = await axios.post('http://localhost:3000/login', {
                ...inputData // email: password:
            });
            console.log(response);
            login(response.data.accessToken);

            navigate('/profile');
            console.log("gebruiker is ingelogd");
        } catch (error) {
            console.error("inloggen niet gelukt", error);

        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>
            {!isAuth ? (
                <>
                    <form onSubmit={handleSubmit(handleSubmitLogin)}>

                        <label htmlFor="email-field">
                            E-mail:
                            <input
                                type="email"
                                id="email-field"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Vul hier je email-adres in",
                                    },
                                })}
                            />
                            {errors.email && <p className="formInputError">{errors.email.message}</p>}
                        </label>

                        <label htmlFor="password-field">
                            Wachtwoord:
                            <input
                                type="password"
                                id="password-field"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Geef je wachtwoord of gok gewoon iets",
                                    },
                                })}
                            />
                            {errors.password && <p className="formInputError">{errors.password.message}</p>}
                        </label>

                        <button type="submit">Inloggen</button>
                    </form>

                    <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
                </>
            ) : (
                <>
                    <p>Je bent al ingelogd.</p>
                    <button type="button" onClick={() => logout()}>
                        Log uit
                    </button>
                </>
            )}

        </>
    );
}

export default SignIn;