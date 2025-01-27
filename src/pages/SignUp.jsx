import React from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleSubmitSignup(inputData){
       try {
           const response = await axios.post('http://localhost:3000/register', {
               ...inputData
           });
       } catch (error) {
           console.error(error);
       }

        navigate('/signin');
        console.log("gebruiker is geregistreerd");
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

        <form onSubmit={handleSubmit(handleSubmitSignup)}>

            <label htmlFor="name-field">
                Naam:
                <input
                    type="text"
                    id="name-field"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Vul hier je naam in",
                        },
                    })}
                />
                {errors.email && <p className="formInputError">{errors.email.message}</p>}
            </label>

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
                            message: "Verzin je eigen wachtwoord",
                        },
                    })}
                />
                {errors.password && <p className="formInputError">{errors.password.message}</p>}
            </label>

            <button type="submit">Registreer</button>
        </form>

      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;