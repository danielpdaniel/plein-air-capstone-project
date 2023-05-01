import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/user"
import { NavLink } from "react-router-dom"

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
            <h3>these are your notifications!</h3>
            {user ? 
            <div className="notificationsWindow">
                {notifications ? notifications.map(notif => 
                    <div key={notif.user_id + notif.study_id + notif.id} className="notification">
                        {notif.comment ?  
                        <div>
                        <a href={`/users/${notif.comment.user_id}`}>{notif.comment.author_username}</a>
                        <p>commented on your <a href={`/studies/${notif.study_id}`}>post:</a> {notif.comment.comment_text}</p>
                        </div>
                        :
                        <div>
                            <p>you got a notification over here!</p>
                        </div>
                        }
                    </div>
                ) 
                : 
                <p>no notifications yet :)</p>}
            </div>
            : <h2>Login/Signup to get started!</h2>}
        </div>
    )
}

export default Notifications