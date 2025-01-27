import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });

    useEffect(() => {
        //     is er een token?
        //     is de token nog geldig? Ligt iat nog voor exp?
        //      ja: gebruikersgegevens opnieuw ophalen, state zetten (login functie)
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            login(token);
        } else {
        }
        //     nee: dan niks
    }, []);


    async function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;
        console.log("Gebruiker is ingelogd!")
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setAuth({
                isAuth: true,
                user: {
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                },
            });
        } catch (error) {
            console.log(error);
            logout();
        }
    }

    function logout() {
        setAuth({
            isAuth: false,
            user: null,
        });
        console.log("Gebruiker is uitgelogd!");
    }

    const contextData = {
        isAuth: auth.isAuth,
        auth: auth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;