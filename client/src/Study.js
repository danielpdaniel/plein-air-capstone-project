import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import StudyCard from "./StudyCard"
import CommentWindow from "./CommentWindow"
import { UserContext } from "./context/user"

function Study(){
    const params = useParams()
    const { user, setUser } = useContext(UserContext)
    const [study, setStudy] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`/studies/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(data=>setStudy(data))
            }
        })
    }, [])

    function handleDeleteStudy(studyId){
        fetch(`/studies/${studyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.ok){
                const updatedUser = {...user}
                updatedUser.studies = user.studies.filter(study => study.id !== studyId)
                setUser(updatedUser)
                navigate('/my_profile')
            }
        })
    }

    function handleNewComment(comment){
        const updatedStudy = {...study}
        const updatedComments = [...study.comments, comment]
        updatedStudy.comments = updatedComments
        setStudy(updatedStudy)
    }

    function handleDeleteComment(comment){
        const updatedStudy = {...study}
        const updatedComments = study.comments.filter(thisComment => thisComment.id !== comment.id)
        updatedStudy.comments = updatedComments
        setStudy(updatedStudy)
    }
    
    return (
        <div className="singleStudy">
            {study ? 
            <StudyCard 
            study={study} 
            studyClassName="singleStudyCard"
            onDeleteStudy={handleDeleteStudy} 
            onNewComment={handleNewComment}
            onDeleteComment={handleDeleteComment}
            />
            :
            <h5>Loading...</h5>}
        </div>
    )
}

export default Study