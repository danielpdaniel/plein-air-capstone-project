import { useContext, useState } from "react"
import { UserContext } from "./context/user"
import { Link, useNavigate } from "react-router-dom"

function CommentWindow({ comments, studyId, onNewComment, onDeleteComment }){
    const [newComment, setNewComment] = useState("")
    const [errors, setErrors] = useState("")
    const {user} = useContext(UserContext)

    const navigate = useNavigate()

    function handlePostComment(e){
        e.preventDefault()

        const postBody = {
            user_id: user.id,
            study_id: studyId,
            comment_text: newComment
        }
        if(user){
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
        }else{
            navigate("/login")
        }
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
                    <Link to={`/users/${comment.user_id}`}>{comment.author_username}:</Link>
                    {comment.user_id === user.id ? <button className="commentDeleteBtn" onClick={()=>handleDeleteComment(comment)}>🗑️</button>: null}

                    <p>{comment.comment_text}</p>
                </div>
            ) : null}

            {errors ? errors.map(error => <p key={error}>{error}</p>) : null}
            {user ? 
            <form onSubmit={(e)=>handlePostComment(e)}>
                <input type="text" placeholder="add new comment..." value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
                <input type="submit" value="Post"/>
            </form>
            :
            <p>Login/Signup to start posting comments! :D</p>}
        </div>
    )
}

export default CommentWindow