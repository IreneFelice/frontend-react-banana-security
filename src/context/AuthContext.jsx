import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState(false);

    function toggleAuthLogin() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!")
    }

    function toggleAuthLogout() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
    }


    return (
        <AuthContext.Provider value={{
            isAuth, toggleAuthLogin, toggleAuthLogout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;