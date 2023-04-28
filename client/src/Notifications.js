import { useContext } from "react"
import { UserContext } from "./context/user"

function Notifications(){

    const { user } = useContext(UserContext)

    return(
        <div>
            {user ? 
            <div>
                <h3>these are your notifications!</h3>
                {user.notifications ? user.notifications.map(notif => <p>you got a notification for {notif.study_id}!</p>) : <p>no notifications yet :)</p>}
            </div>
            : <h2>Login/Signup to get started!</h2>}
        </div>
    )
}

export default Notifications