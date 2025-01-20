import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState(false);

    function toggleAuthNow() {
        toggleIsAuth(prevState => !prevState)
    };


    return (
        <AuthContext.Provider value={{
            isAuth, toggleAuthNow}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;