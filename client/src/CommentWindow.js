import { useContext, useState } from "react"
import { UserContext } from "./context/user"
import { NavLink } from "react-router-dom"

function CommentWindow({ comments, studyId, onNewComment, onDeleteComment }){
    const [newComment, setNewComment] = useState("")
    const [errors, setErrors] = useState("")
    const {user} = useContext(UserContext)

    function handlePostComment(e){
        e.preventDefault()

        const postBody = {
            user_id: user.id,
            study_id: studyId,
            comment_text: newComment
        }

        fetch("/comments",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r => {
            if(r.ok){
                r.json().then(data => {
                    onNewComment(data);
                    setErrors("")
                    setNewComment("")
                })
            }
            else{
                r.json().then(data=>setErrors(data.errors))
            }
        })
    }

    function handleDeleteComment(comment){
  
        fetch(`/comments/${comment.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.ok){
                onDeleteComment(comment)
            }
        })
    }


    return(
        <div className="commentWindow">
            <h4>Comments</h4>
            {/* {comments ? comments.map(comment => console.log(comment)) : <p>no comments!</p>} */}
            {comments ? comments.map(comment => 
                <div key={comment.id + comment.comment_text} className="comment">
                    <NavLink to={`/users/${comment.user_id}`}>{comment.author_username}:</NavLink>
                    {comment.user_id === user.id ? <button className="commentDeleteBtn" onClick={()=>handleDeleteComment(comment)}>🗑️</button>: null}

                    <p>{comment.comment_text}</p>
                </div>
            ) : null}

            {errors ? errors.map(error => <p key={error}>{error}</p>) : null}
            <form onSubmit={(e)=>handlePostComment(e)}>
                <input type="text" placeholder="add new comment..." value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
                <input type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default CommentWindow