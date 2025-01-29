import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext(null);


function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
        token: '',
    });

    // PERSIST ON REFRESH //
    useEffect(() => {
        // is er een token?
        // zo ja, probeer te decoderen en check geldigheid.
        //// gelukt en geldig? login()
        //// lukt dat niet en/of niet geldig: logout()

        // geen token: logout()
        const validateToken = async () => {

            const token = localStorage.getItem('token');
            if (token) { // er is een token gevonden
                try {
                    const decodedToken = jwtDecode(token);

                    if (isTokenValid(decodedToken)) {
                        await login(token);  // login als token valid is
                    } else { // als token verlopen is, verwijder die dan
                        console.log('token is verlopen en wordt verwijderd.. Opnieuw inloggen.');
                        logout();
                    }
                } catch (error) { // decoderen gaat fout
                    console.error("Fout bij het valideren van de token:", error);
                    logout();
                }
            } else { // er is geen token
                logout();
            }
        };

        validateToken();
    }, []);

    // LOGIN //
    async function login(token) {

        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;
        console.log("Gebruiker is ingelogd! Token decoded:", decodedToken)
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
                    color: response.data.favcolor,
                },
                status: 'done',
                token: token,
            });
        } catch (error) {
            console.log(error);
            logout();
        }
    }

    // LOGOUT //
    function logout() {
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
            token: '',
        });
        localStorage.removeItem('token');
        console.log("Gebruiker is uitgelogd!");
    }

    const contextData = {
        isAuth: auth.isAuth,
        auth: auth,
        token: auth.token,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;