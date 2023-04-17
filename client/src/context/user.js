import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {


const [user, setUser] = useState("")

useEffect(()=>{
    fetch('/me')
    .then(r=>{
        if(r.ok){
        r.json().then(data => {setUser(data)})
        }else{
            setUser("")
        }
    })
}, [])

return(
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
)
}

export { UserContext, UserProvider}