import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

// maakt mogelijk om stukje state bij te houden of iemand is ingelogd
// en info over gebruiken
function AuthContextProvider({ children }) {
    // in de state wordt samen met boolean isAuth, ook informatie van de gebruiker opgeslagen, in een object
    const [auth, setAuth] = useState({
    isAuth: false,
    user: {},
    status: 'pending',
    });

    // useEffect ( () => om te controleren of er is ingelogd en of de token nog geldig is
    // Is er een token? En is deze nog geldig? ----> helper functie schrijven, is iat lager dan exp?
    //    Ja? Haal informatie opnieuw op
    //    Nee? Dan blijft de state leeg. Maar wel de status op 'done' zetten!

    useEffect ( () => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            void login(token);
        } else {
        setAuth({
            isAuth: false,
            user: null,
            status:  'done',
        })
        }
    }, []);

    const navigate = useNavigate();




 //    login functie van de context ontvangt token
 async function login(token) {
     // token in local storage opslaan
     localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.sub);

    try {
    // probeer info over deze gebruiker op te halen
        const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        console.log(response);
    //     sla dan de info op in de state
        setAuth({
            isAuth: true,
            user: {
                username: response.data.username,
                email: response.data.email,
                id: response.data.id,
            },
            status: 'done',
    });
    } catch(e)
        // als dat niet lukt, dan gebruiker weer uitloggen
     logout()
     console.error(e);
    }

     });
     console.log('Er is ingelogd');
     navigate('/profile');
 }

 function logout() {
     console.log('Er is uitgelogd');
     setAuth({
         isAuth: false,
         user: null,
         status: 'done',
     });
     navigate('/');
 }

    const contextData = {
        isAuth: auth.isAuth,
        testje: ' ---- dit is een testje',
        login: login,
        logout: logout,

    };

    return (

        <AuthContext.Provider value={contextData}>
            {/*{auth.status === 'done' ? children : <p>loading...</p>}*/}
            {/*//is status done? dan children uitvoeren//*/}
            {auth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>


    );

}

export default AuthContextProvider;

