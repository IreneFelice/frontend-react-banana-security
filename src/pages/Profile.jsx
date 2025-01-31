import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


function Profile() {
    const {auth, token} = useContext(AuthContext);
    const [favColor, setFavColor] = useState('');
    const [superSecret, setSuperSecret] = useState('');

    function handleHelpClick(){
        setFavColor(auth.user.color);
    }

    useEffect(()=>{
        async function findSecret () {
            try {
                const response = await axios.get(`http://localhost:3000/660/private-content`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("response", response);
              setSuperSecret(response.data.content);
            } catch (e) {
                console.log(e);
            }
        }
        findSecret();
    },[])


  return (
    <>
      <h1>Hallo {auth.user.name}!</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {auth.user.name}</p>
        <p><strong>Email:</strong> {auth.user.email} </p>
      </section>

        <section>
            <h2>Lievelingskleur</h2>

                    <button type="button" onClick={handleHelpClick}>Help! Ik ben mijn lievelingskleur vergeten!</button>
                    <div>{favColor && <p>Rustig maar, je lievelingskleur is {favColor}</p>}</div>
        </section>

      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>{superSecret}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;