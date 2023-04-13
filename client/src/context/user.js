import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {


const [user, setUser] = useState("")

return(
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
)
}

export { UserContext, UserProvider}