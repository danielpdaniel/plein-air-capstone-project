import { UserContext } from "./context/user"
import { useContext } from "react"
import NewStudyForm from "./NewStudyForm"
import EditStudyForm from "./EditStudyForm"

function Home(){

    const {user, setUser} = useContext(UserContext)

    // function handleNewStudyState(data){
    //     updatedUser
    // }

    return(
        <div>
            <h2>Welcome!</h2>
            {user ? <h3>Congrats on logging in!</h3> : <h3>Login/Signup to get started!</h3>}
            {user ? <NewStudyForm/> : null}
        </div>
    )
}

export default Home