import { UserContext } from "./context/user"
import { useContext } from "react"

function Home(){

    const {user} = useContext(UserContext)

console.log("baby")
    return(
        <div>
            <h2>Welcome!</h2>
            {user ? <h3>Congrats on logging in!</h3> : <h3>Login/Signup to get started!</h3>}
        </div>
    )
}

export default Home