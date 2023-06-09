import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import Profile from"./Profile"
import UserEditProfile from "./UserEditProfile"

function MyProfile(){
    const params = useParams()
    const { user, setUser } = useContext(UserContext)
    const [pageUser, setPageUser] = useState("")
    const [studies, setStudies] = useState("")
    const [studyEdit, setStudyEdit] = useState("")
    const [editProfileStatus, setEditProfileStatus] = useState(false)
    
    useEffect(()=>{
        if(user){
            setPageUser(user)
            setStudies(user.studies)
        }
    },[user])

    function handleDeleteStudiesState(studyID){
        const updatedStudies = studies.filter(study => study.id !== studyID)

        const updatedUser = {...user}
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

        const updatedUser = {...user}
        updatedUser.studies = updatedStudies
        setStudies(updatedStudies)
        setUser(updatedUser)
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

        const updatedUser = {...user}
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

        const updatedUser = {...user}
        updatedUser.studies = updatedStudies
        setStudies(updatedStudies)
        setUser(updatedUser)
    }

    return (
    <>
    <br></br>
    <button id="editProfileBtn" onClick={()=>setEditProfileStatus(editProfileStatus => !editProfileStatus)}>{editProfileStatus ? "Cancel" : "Edit Profile" }</button>
    {editProfileStatus ? 
        <UserEditProfile
        pageUser={pageUser} 
        studies={studies}
        setStudies={setStudies}
        studyEdit={studyEdit}
        setStudyEdit={setStudyEdit}
        handleStudyEdit={handleStudyEdit}
        handleDeleteStudiesState={handleDeleteStudiesState}
        onNewComment={handleNewComment}
        onDeleteComment={handleDeleteComment}
        setEditProfileStatus={setEditProfileStatus}
        />
    :
    
        <Profile 
        pageUser={pageUser} 
        studies={studies}
        setStudies={setStudies}
        studyEdit={studyEdit}
        setStudyEdit={setStudyEdit}
        handleStudyEdit={handleStudyEdit}
        handleDeleteStudiesState={handleDeleteStudiesState}
        onNewComment={handleNewComment}
        onDeleteComment={handleDeleteComment}
        />}
        
    </>
        
    )   
}

export default MyProfile