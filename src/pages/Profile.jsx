import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function Profile() {
    const {auth} = useContext(AuthContext);
  return (
    <>
      <h1>Hallo {auth.user.name}!</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {auth.user.name}</p>
        <p><strong>Email:</strong> {auth.user.email} </p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;