import { useContext } from "react"
import { UserContext } from "./context/user"

function StudyCard({ study }){
    const {user} = useContext(UserContext)


    function handleDeleteClick(e){
        console.log(study.id)
    }
return (
    <div className="studyCard">
        {study.user_id == user.id ? 
        <div>
            <button>
                ✏️
            </button>
            <button onClick={handleDeleteClick}>
                🗑️
            </button>
            
        </div> : null}
        {study.attached_images.map(image =>  <img key={image} src={image}/>)}
        <p>{study.caption}</p>
        <p>{study.id}</p>
    </div>
)
}

export default StudyCard