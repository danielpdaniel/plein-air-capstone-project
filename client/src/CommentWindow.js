import { useContext, useState } from "react"
import { UserContext } from "./context/user"

function CommentWindow({ comments, studyId, onNewComment }){
    const [newComment, setNewComment] = useState("")
    const [errors, setErrors] = useState("")
    const {user} = useContext(UserContext)

    function handlePostComment(e){
        e.preventDefault()
        console.log(newComment)
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
                r.json().then(data => onNewComment(data))
            }
            else{
                r.json().then(data=>setErrors(data.errors))
            }
        })
    }


    return(
        <div className="commentWindow">
            <h4>Comments</h4>
            {/* {comments ? comments.map(comment => console.log(comment)) : <p>no comments!</p>} */}
            {comments ? comments.map(comment => 
                <div key={comment.id + comment.comment_text}>
                    <h5>{comment.author_username}:</h5>
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