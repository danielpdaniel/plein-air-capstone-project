import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import StudyCard from "./StudyCard"
import EditStudyForm from "./EditStudyForm"
import Profile from"./Profile"

function MyProfile(){
    const params = useParams()
    const { user, setUser } = useContext(UserContext)
    const [pageUser, setPageUser] = useState("")
    const [studies, setStudies] = useState("")
    const [studyEdit, setStudyEdit] = useState("")
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(user){
            setPageUser(user)
            // console.log(user.studies)
            setStudies(user.studies)
        }
    },[user])

    function handleDeleteStudiesState(studyID){
        const updatedStudies = studies.filter(study => study.id !== studyID)

        const updatedUser = user
        updatedUser.studies = updatedStudies
        setStudies(updatedStudies)
        setUser(updatedUser)
        
    }
    
    function handleStudyEdit(editedStudy){
        const updatedStudies = []
        studies.map(study =>{
            if(study.id === editedStudy.id){
                updatedStudies.push(editedStudy)
            }else{
                updatedStudies.push(study)
            }
        })

        const updatedUser = user
        updatedUser.studies = updatedStudies
        setStudies(updatedStudies)
        setUser(updatedUser)
    }

    function onTagClick(tag){
        // navigate(`/my_profile/tags/${tag.id}/studies`)
    }

    function handleNewComment(comment){
        const updatedStudies = []
        studies.map(study =>{
            if(study.id === comment.study_id){
                study.comments = [...study.comments, comment]
                updatedStudies.push(study)
            }else{
                updatedStudies.push(study)
            }
        })

        const updatedUser = user
        updatedUser.studies = updatedStudies
        setStudies(updatedStudies)
        setUser(updatedUser)
    }

    function handleDeleteComment(comment){
        const updatedStudies = []
        studies.map(study =>{
            if(study.id === comment.study_id){
                const updatedComments = study.comments.filter(thisComment => thisComment.id !== comment.id)
                study.comments = updatedComments
                updatedStudies.push(study)
            }else{
                updatedStudies.push(study)
            }
        })

        const updatedUser = user
        updatedUser.studies = updatedStudies
        setStudies(updatedStudies)
        setUser(updatedUser)
    }

    return (
        <Profile 
        pageUser={pageUser} 
        studies={studies}
        setStudies={setStudies}
        studyEdit={studyEdit}
        setStudyEdit={setStudyEdit}
        handleStudyEdit={handleStudyEdit}
        handleDeleteStudiesState={handleDeleteStudiesState}
        onTagClick={onTagClick}
        onNewComment={handleNewComment}
        onDeleteComment={handleDeleteComment}
        />
    )


    // return (
    //     <div>
    //         {pageUser ? 
    //         <div>
    //             <h3>{pageUser.username}</h3>
    //             <img src={pageUser.avatar_info} alt={pageUser.username} />
    //             <p>{pageUser.about}</p>
    //             <div className="userStudies">
    //                 {studies ? studies.map(study => study.id === studyEdit ?
    //                 <EditStudyForm key={study.id} study={study} setStudyEdit={setStudyEdit} onStudyEdit={handleStudyEdit}/>
    //                 :
    //                 <StudyCard key={study.id} study={study} onDeleteStudy={handleDeleteStudiesState} setStudyEdit={setStudyEdit} studyClassName="studyCard"/>
    //                 ) : null}
    //             </div>
    //         </div>
    //         : <h5>User Not Found</h5>}
    //     </div>
    // )
}

export default MyProfile