import { NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/user"

function NavBar(){
    const { user, setUser } = useContext(UserContext)
    const [notif, setNotif] = useState(user ? user.unread_notifs : "")

    console.log(user.unread_notifs)

    function handleLogout(){
        fetch("/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r=>{
            if(r.ok){
                setUser("")
            }
        })
    }

    useEffect(()=>{
        if(user){
            console.log("hello from navbar")
            console.log(user.unread_notifs)
            setNotif(user.unread_notifs)
        }
    }, [user])

    return(
        <div className="NavBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/map">Map</NavLink>
            {user ? <NavLink to={'/notifications'}>{notif ? '⛅' : '☁️' }</NavLink> : null}
            {user ? <NavLink to={`/my_profile`}>My Page</NavLink> : null}
            {user ? <button onClick={() => handleLogout()}>Logout</button> : <NavLink to="/login">Login</NavLink>}
        </div>
    )
}

export default NavBar