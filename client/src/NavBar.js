import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/user"

function NavBar(){
    const { user, setUser } = useContext(UserContext)
    const [notif, setNotif] = useState(user ? user.unread_notifs : "")

    const navigate = useNavigate()

    function handleLogout(){
        fetch("/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r=>{
            if(r.ok){
                setUser("")
                navigate("/")
            }
        })
    }

    useEffect(()=>{
        if(user){
            setNotif(user.unread_notifs)
        }
    }, [user])

    return(
        <div className="NavBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Search</NavLink>
            <NavLink to="/map">Map</NavLink>
            {user ? <NavLink to={'/notifications'}>{notif ? '⛅' : '☁️' }</NavLink> : null}
            {user ? <NavLink to={`/my_profile`}>My Page</NavLink> : null}
            {user ? <button onClick={() => handleLogout()}>Logout</button> : <NavLink to="/login">Login</NavLink>}
        </div>
    )
}

export default NavBar