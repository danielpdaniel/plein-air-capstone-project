import { useState } from "react"

function CommentWindow({ comments }){
    const [newComment, setNewComment] = useState("")

    return(
        <div className="commentWindow">
            <h4>Comments</h4>
            {/* {comments ? comments.map(comment => console.log(comment)) : <p>no comments!</p>} */}
            {comments ? comments.map(comment => 
                <div key={comment.comment_text}>
                    <h5>{comment.id}:</h5>
                    <p>{comment.comment_text}</p>
                </div>
            ) : null}

            <form>
                <input type="text" placeholder="add new comment..." value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
            </form>
        </div>
    )
}

export default CommentWindow