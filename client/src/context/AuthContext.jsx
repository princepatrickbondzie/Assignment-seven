import {createContext, useState} from 'react'

export const AuthContext = createContext("Jesus");
const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState();

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>);
}

export default AuthContextProvider;
