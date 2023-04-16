import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/user"

function NavBar(){
    const { user, setUser } = useContext(UserContext)

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
    return(
        <div className="NavBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/map">Map</NavLink>
            {user ? <NavLink to={`/users/${user.id}`}>My Page</NavLink> : null}
            {user ? <button onClick={() => handleLogout()}>Logout</button> : <NavLink to="/login">Login</NavLink>}
        </div>
    )
}

export default NavBar