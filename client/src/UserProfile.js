import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import StudyCard from "./StudyCard"
import EditStudyForm from "./EditStudyForm"
import Profile from"./Profile"

function UserProfile(){
    const params = useParams()
    const [pageUser, setPageUser] = useState("")
    const [studies, setStudies] = useState("")
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    // useEffect(()=>{
    //     if(params.id == user.id){
    //         setPageUser(user)
    //         setStudies(user.studies)
    //     }else{
    //         if(params.tag_id){
    //             console.log(params.tag_id)
    //             fetch(`/users/${params.id}`)
    //         }else{
    //             fetch(`/users/${params.id}`)
    //             .then(r=>{
    //                 if(r.ok){
    //                     r.json().then(data => {
    //                         setPageUser(data)
    //                         setStudies(data.studies)
    //                     })
    //                 }
    //                 })
    //             }
    //         }
    // }, [])

    useEffect(()=>{
        if(params.id == user.id){
            setPageUser(user)
            setStudies(user.studies)
        }else{
            if(params.tag_id){
                console.log(params.tag_id)
                fetch(`/users/${params.id}`)
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
            }
    }, [])

    function onTagClick(tag){
        console.log(tag)
        // navigate(`/users/${pageUser.id}/tags/${tag.id}/studies`)

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

        setStudies(updatedStudies)
    }

    // function handleDeleteStudiesState(studyID){
    //     const updatedStudies = studies.filter(study => study.id !== studyID)
    //     console.log(updatedStudies)
    //     setStudies(updatedStudies)
    // }
    
    // function handleStudyEdit(editedStudy){
    //     const updatedStudies = []
    //     studies.map(study =>{
    //         if(study.id == editedStudy.id){
    //             updatedStudies.push(editedStudy)
    //         }else{
    //             updatedStudies.push(study)
    //         }
    //     })
    //     setStudies(updatedStudies)
    // }

    return (
        <Profile 
        pageUser={pageUser} 
        studies={studies}
        setStudies={setStudies}
        onTagClick={(tag)=>onTagClick(tag)}
        onNewComment={handleNewComment}
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

export default UserProfile