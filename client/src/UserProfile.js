import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./context/user"
import Profile from"./Profile"

function UserProfile(){
    const params = useParams()
    const [pageUser, setPageUser] = useState("")
    const [studies, setStudies] = useState("")
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("foo")
        if(params.id == user.id){
            navigate('/my_profile')
            // setPageUser(user)
            // setStudies(user.studies)
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
    }, [params])

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

        setStudies(updatedStudies)
    }   

    return (
        <Profile 
        pageUser={pageUser} 
        studies={studies}
        setStudies={setStudies}
        onNewComment={handleNewComment}
        onDeleteComment={handleDeleteComment}
        />
    )
}

export default UserProfile