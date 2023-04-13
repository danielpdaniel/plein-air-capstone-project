import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function UserProfile(){
    const params = useParams()
    const [pageUser, setPageUser] = useState("")
    useEffect(()=>{
        fetch(`/users/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(data => setPageUser(data))
            }
            })
    },[])

    return (
        <div>
            {pageUser ? <h3>Valid!</h3> : <h5>GET OUT!!!!!</h5>}
        </div>
    )
}

export default UserProfile