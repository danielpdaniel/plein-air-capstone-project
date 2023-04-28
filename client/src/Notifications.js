import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/user"

function Notifications(){

    const { user } = useContext(UserContext)
    const [notifications, setNotifications] = useState("")

    useEffect(()=>{
        fetch("/notifications")
        .then(r=>{
            if(r.ok){
                r.json().then(data => setNotifications(data))
            }
        })
    }, [])

    return(
        <div>
            {user ? 
            <div>
                <h3>these are your notifications!</h3>
                {notifications ? notifications.map(notif => <p>you got a notification for {notif.study_id}!</p>) : <p>no notifications yet :)</p>}
            </div>
            : <h2>Login/Signup to get started!</h2>}
        </div>
    )
}

export default Notifications