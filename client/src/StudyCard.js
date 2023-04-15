import { useContext } from "react"
import { UserContext } from "./context/user"

function StudyCard({ study, handleDeleteStudiesState, setStudyEdit }){
    const {user} = useContext(UserContext)


    function handleDeleteClick(){
        console.log(study.id)
        fetch(`/studies/${study.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.ok){
                handleDeleteStudiesState(study.id)
            }
        })
    }
    console.log(study)
if(study.tags){
    console.log(study.tags)
}
return (
    <div className="studyCard">
        {study.user_id == user.id ? 
        <div>
            <button onClick={()=>setStudyEdit(study.id)}>
                ✏️
            </button>
            <button onClick={handleDeleteClick}>
                🗑️
            </button>
            
        </div> : null}
        {study.attached_images.map(image =>  <img key={image.id} src={image.img_url}/>)}
        <p>{study.caption}</p>
        {study.tags ? study.tags.map(tag => <p key={tag.id} className="studyTags">#{tag.name}</p>) : null}
    </div>
)
}

export default StudyCard