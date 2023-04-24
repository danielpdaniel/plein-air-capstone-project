import { useContext } from "react"
import { UserContext } from "./context/user"
import { NavLink } from "react-router-dom"

function StudyCard({ study, onDeleteStudy, setStudyEdit, studyClassName, onTagClick}){
    const {user, setUser} = useContext(UserContext)

    function handleDeleteClick(){
        fetch(`/studies/${study.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.ok){
                onDeleteStudy(study.id)
                const updatedUser = user
                const updatedStudies = user.studies.filter(thisStudy => study.id !== thisStudy.id)
                updatedUser.studies = updatedStudies
                setUser(updatedUser)
            }
        })
    }
    console.log(study)

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
        <NavLink>{study.author_username}</NavLink>
        {studyClassName == "mapStudyCard" ? <img src={study.attached_images[0].img_url} className="studyImgs"/>: study.attached_images.map(image =>  <img key={image.id} src={image.img_url} className="studyImgs"/>)}
        <p>{study.caption}</p>
        <p>{study.tags ? study.tags.map(tag => <button className="studyEditTags" key={tag.name} onClick={()=>onTagClick(tag)}>#{tag.name}</button>) : null}</p>
        {/* {study.tags ? study.tags.map(tag => <p key={tag.id} className="studyTags">#{tag.name}</p>) : null} */}
    </div>
)
}

export default StudyCard