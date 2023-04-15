import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import StudyCard from "./StudyCard"

function UserProfile(){
    const params = useParams()
    const [pageUser, setPageUser] = useState("")
    const [studies, setStudies] = useState("")
    const { user } = useContext(UserContext)

    useEffect(()=>{
        if(params.id == user.id){
            setPageUser(user)
        }else{
        fetch(`/users/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(data => {
                    setPageUser(data)
                    setStudies(data.studies)
                })
            }
            })
        }
    },[])

    function handleDeleteStudiesState(studyID){
        const updatedStudies = studies.filter(study => study.id !== studyID)
        console.log(updatedStudies)
        setStudies(updatedStudies)
    }

    return (
        <div>
            {pageUser ? 
            <div>
                <h3>{pageUser.username}</h3>
                <img src={pageUser.avatar_info} alt={pageUser.username} />
                <p>{pageUser.about}</p>
                <div className="userStudies">
                    {studies ? studies.map(study => <StudyCard key={study.id} study={study} handleDeleteStudiesState={handleDeleteStudiesState}/>) : null}
                </div>
            </div>
            : <h5>User Not Found</h5>}
        </div>
    )
}

export default UserProfile