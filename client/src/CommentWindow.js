import { useState } from "react"

function CommentWindow(comments){
    const [newComment, setNewComment] = useState("")
    
    return(
        <div>
            {comments ? comments.map(comment => {
                <div>
                    <h5>{comment.id}</h5>
                    <p>{comment.comment_text}</p>
                </div>
            }) : <p>no comments yet...</p>}

            <form>
                <input type="text" placeholder="add new comment..." value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
            </form>
        </div>
    )
}

export default CommentWindow