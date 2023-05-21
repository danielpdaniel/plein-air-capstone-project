import { useContext, useEffect, useState } from "react"
import StudyCard from "./StudyCard"
import { UserContext } from "./context/user"
import EditStudyForm from "./EditStudyForm"

function Search(){
    const [tagValue, setTagValue] = useState("")
    const [tagEntry, setTagEntry] = useState("")
    const [studies, setStudies] = useState("")
    const [errors, setErrors] = useState("")
    const [studyEdit, setStudyEdit] = useState("")

    const {user, setUser} = useContext(UserContext)

    function handleSearchSubmit(e){
        e.preventDefault()
        setTagEntry(tagValue)
    }

    useEffect(()=>{
        if(tagEntry){
            fetch(`/tagged/${tagEntry}`)
            .then(r=>{
                if(r.ok){
                    r.json().then(data=>{setStudies(data); setErrors("")})
                }
                else{
                    r.json().then(data => setErrors([data.error]))
                }
            })
        }
    }, [tagEntry])


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

    function handleDeleteStudiesState(studyID){
        const updatedStudies = studies.filter(study => study.id !== studyID)

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

    return(
        <div>
            <h2>Search Studies By Tag</h2>
            <form onSubmit={(e)=>handleSearchSubmit(e)}>
                <input type="text" value={tagValue} onChange={e => setTagValue(e.target.value)} placeholder="search tag..."/>
                <input type="submit"/>
            </form>
            <div className="userStudies">
                {studies ? studies.map(study => 
                    study.id === studyEdit ?
                    <EditStudyForm
                    key={study.id} 
                    study={study} 
                    setStudyEdit={setStudyEdit} 
                    onStudyEdit={handleStudyEdit} 
                    editFormClassName="studyCard"
                    />
                    :
                    <StudyCard
                    key={study.id} 
                    study={study} 
                    onDeleteStudy={handleDeleteStudiesState} 
                    setStudyEdit={setStudyEdit} 
                    studyClassName="studyCard"
                    onTagClick={(tag)=>{setTagEntry(tag.tag_name); setTagValue(tag.tag_name)}}
                    onNewComment={handleNewComment}
                    onDeleteComment={handleDeleteComment}
                    />
                    )
                : <h3>use the form to search all studies by tag...</h3>}
            </div>
        </div>
    )
}

export default Search