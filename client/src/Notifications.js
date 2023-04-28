import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/user"

function Notifications(){

    const { user, setUser } = useContext(UserContext)
    const [notifications, setNotifications] = useState("")

    useEffect(()=>{
        fetch("/notifications")
        .then(r=>{
            if(r.ok){
                r.json().then(data => {
                    setNotifications(data)
                    const updatedUser = user
                    updatedUser.unread_notifs = false
                    setUser(updatedUser)
                })
            }
        })
    }, [])

    return(
        <div>
            {user ? 
            <div>
                <h3>these are your notifications!</h3>
                {notifications ? notifications.map(notif => <p key={notif.user_id + notif.study_id + notif.id}>{notif.comment ? `${notif.comment.author_username} commented on your study: ${notif.comment.comment_text}` : "you got a notification over here!"}!</p>) : <p>no notifications yet :)</p>}
            </div>
            : <h2>Login/Signup to get started!</h2>}
        </div>
    )
}

export default Notifications