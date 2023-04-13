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
        <div>
            <NavLink to="/">Home</NavLink>
            {user ? <button onClick={() => handleLogout()}>Logout</button> : <NavLink to="/login">Login</NavLink>}
        </div>
    )
}

export default NavBar