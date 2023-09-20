import React, { createContext, useState } from 'react';

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [auth, setAuth] = useState(true)

    const toggleAuth = () => {
        setAuth(false)
    }

    const value = {auth, toggleAuth}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;