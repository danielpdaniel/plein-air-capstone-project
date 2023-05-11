import StudyCard from "./StudyCard"
import EditStudyForm from "./EditStudyForm"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Profile({pageUser, studies, studyEdit, handleStudyEdit, handleDeleteStudiesState, setStudyEdit, setStudies, onNewComment, onDeleteComment}){

    const navigate = useNavigate()
    // const params = useParams

    const [tagEntry, setTagEntry] = useState("")
    const [tagFilter, setTagFilter] = useState("")

    function handleTagClick(tag){
        console.log(tag)
        // console.log(params)
        // navigate(`/tags/${tag.id}/studies`)
    }

    useEffect(()=>{
        if(tagEntry){
            
            fetch(`/tagged/${tagEntry}`)
            .then(r => {
                if(r.ok){
                    r.json().then(data => setStudies(data))
                }
            })
        }else if(pageUser){
            
            fetch(`/users/${pageUser.id}`)
            .then(r =>{
                if(r.ok){
                    r.json().then(data => setStudies(data.studies))
                }
            })
        }
    }, [tagEntry])

    return (
        <div>
            {pageUser ? 
            <div>
                <h3>{pageUser.username}</h3>
                <img src={pageUser.avatar_info} alt={pageUser.username} className={pageUser.circular_avatar_status ? "profileAvatarCircle" : "profileAvatar"}/>
                <p>{pageUser.about}</p>


                {tagEntry ? 
            <button className="studyEditTags" onClick={()=>setTagEntry("")}>{tagEntry}  X</button> 
            : 
            <form onSubmit={(e)=>{e.preventDefault(); setTagEntry(tagFilter); setTagFilter("")}}>
                <input type="text" value={tagFilter} onChange={(e)=> setTagFilter(e.target.value)} placeholder="seach tag here..." />
                <input type="submit" value="search tag"/>
            </form>}

                    <br></br>

                <div className="userStudies">
                    {studies ? studies.map(study => study.id === studyEdit ?
                    <EditStudyForm 
                    key={study.id} 
                    study={study} 
                    setStudyEdit={setStudyEdit} 
                    onStudyEdit={handleStudyEdit} 
                    editFormClassName="studyCard"/>
                    :
                    <StudyCard 
                    key={study.id} 
                    study={study} 
                    onDeleteStudy={handleDeleteStudiesState} 
                    setStudyEdit={setStudyEdit} 
                    studyClassName="studyCard"
                    onTagClick={(tag)=>setTagEntry(tag.name)}
                    onNewComment={onNewComment}
                    onDeleteComment={onDeleteComment}
                    />
                    ) : null}
                </div>
            </div>
            : <h5>User Not Found</h5>}
          
        </div>
    )
}

export default Profile