import { useContext } from "react"
import { UserContext } from "./context/user"

function StudyCard({ study, onDeleteStudy, setStudyEdit, studyClassName}){
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
                onDeleteStudy(study.id)
            }
        })
    }

return (
    <div className={studyClassName}>
        {study.user_id == user.id ? 
        <div>
            <button onClick={()=>setStudyEdit(study.id)}>
                ✏️
            </button>
            <button onClick={handleDeleteClick}>
                🗑️
            </button>
            
        </div> : null}
        {study.attached_images.map(image =>  <img key={image.id} src={image.img_url} className="studyImgs"/>)}
        <p>{study.caption}</p>
        <p>{study.tags ? study.tags.map(tag => tag !== study.tags[study.tags.length - 1] ? `#${tag.name}, ` : `#${tag.name}`): null}</p>
        {/* {study.tags ? study.tags.map(tag => <p key={tag.id} className="studyTags">#{tag.name}</p>) : null} */}
    </div>
)
}

export default StudyCard