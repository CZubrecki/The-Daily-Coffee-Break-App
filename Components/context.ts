import React, { createContext } from 'react';

export const AuthContext = createContext({
    login: (email: string, password: string) => { },
    logout: () => { },
    signUp: (email: string, password: string) => { },
});