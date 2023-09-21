import React, { createContext, useState } from 'react';

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [auth, setAuth] = useState(false)

    const trueAuth = () => {
        setAuth(true)
    }

    const falseAuth = () => {
        setAuth(false)
    }

    const value = {auth, trueAuth, falseAuth}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;