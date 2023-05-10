import { useContext, useState } from "react"
import { UserContext } from "./context/user"
import { NavLink } from "react-router-dom"
import CommentWindow from "./CommentWindow"

function StudyCard({ study, onDeleteStudy, setStudyEdit, studyClassName, onTagClick, onNewComment, onDeleteComment}){
    const {user, setUser} = useContext(UserContext)
    const [commentStatus, setCommentStatus] = useState(false)
   
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
                // const updatedUser = {...user}
                // const updatedStudies = user.studies.filter(thisStudy => study.id !== thisStudy.id)
                // updatedUser.studies = updatedStudies
                // console.log(updatedUser)
                // setUser(updatedUser)
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
        <NavLink to={study ? `/users/${study.user_id}` : null}>{study.author_username}</NavLink>
        <br></br>
        {studyClassName == "mapStudyCard" ? <img src={study.attached_images[0].img_url} className="studyImgs"/>: study.attached_images.map(image =>  <img key={image.id} src={image.img_url} className="studyImgs"/>)}
        <p>{study.caption}</p>
        <p>{study.tags ? study.tags.map(tag => <button className="studyEditTags" key={tag.name} onClick={()=>onTagClick(tag)}>#{tag.name}</button>) : null}</p>
        {/* {study.tags ? study.tags.map(tag => <p key={tag.id} className="studyTags">#{tag.name}</p>) : null} */}
        <button onClick={() => setCommentStatus(!commentStatus)}>{commentStatus ? 'X' : '💬' }</button>
        {commentStatus ? <CommentWindow comments={study.comments} studyId={study.id} onNewComment={onNewComment} onDeleteComment={onDeleteComment}/> : null}
    </div>
)
}

export default StudyCard