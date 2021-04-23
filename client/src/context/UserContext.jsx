import React from 'react'
import { createContext, useState } from "react";


export const UserContext = createContext("Jesus");



const UserContextProvider = (props) => {
    const [user, setUser] = useState("Guest User");
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
