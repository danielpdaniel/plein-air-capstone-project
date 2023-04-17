import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import StudyCard from "./StudyCard"
import EditStudyForm from "./EditStudyForm"

function UserProfile(){
    const params = useParams()
    const [pageUser, setPageUser] = useState("")
    const [studies, setStudies] = useState("")
    const [studyEdit, setStudyEdit] = useState("")
    const { user } = useContext(UserContext)

    useEffect(()=>{
        if(params.id == user.id){
            setPageUser(user)
            setStudies(user.studies)
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
    
    function handleStudyEdit(editedStudy){
        const updatedStudies = []
        studies.map(study =>{
            if(study.id == editedStudy.id){
                updatedStudies.push(editedStudy)
            }else{
                updatedStudies.push(study)
            }
        })
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
                    {studies ? studies.map(study => study.id === studyEdit ?
                    <EditStudyForm key={study.id} study={study} setStudyEdit={setStudyEdit} onStudyEdit={handleStudyEdit}/>
                    :
                    <StudyCard key={study.id} study={study} onDeleteStudy={handleDeleteStudiesState} setStudyEdit={setStudyEdit} studyClassName="studyCard"/>
                    ) : null}
                </div>
            </div>
            : <h5>User Not Found</h5>}
        </div>
    )
}

export default UserProfile