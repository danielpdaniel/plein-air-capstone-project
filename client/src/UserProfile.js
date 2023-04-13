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
            {pageUser ? <h3>Valid!</h3> : <h5>GET OUT!!!!!</h5>}
        </div>
    )
}

export default UserProfile