import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"

function UserProfile(){
    const params = useParams()
    const [pageUser, setPageUser] = useState("")
    const { user } = useContext(UserContext)
    useEffect(()=>{
        if(params.id == user.id){
            setPageUser(user)
        }else{
        fetch(`/users/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(data => setPageUser(data))
            }
            })
        }
    },[])

    return (
        <div>
            {pageUser ? 
            <div>
                <h3>{pageUser.username}</h3>
                <img src={pageUser.avatar_info} alt={pageUser.username} />
                <p>{pageUser.about}</p>
            </div>
            : <h5>User Not Found</h5>}
        </div>
    )
}

export default UserProfile