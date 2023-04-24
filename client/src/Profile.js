import StudyCard from "./StudyCard"
import EditStudyForm from "./EditStudyForm"
import { useNavigate, useParams } from "react-router-dom"

function Profile({pageUser, studies, studyEdit, handleStudyEdit, handleDeleteStudiesState, setStudyEdit, onTagClick}){

    const navigate = useNavigate()
    // const params = useParams

    function handleTagClick(tag){
        console.log(tag)
        // console.log(params)
        navigate(`/tags/${tag.id}/studies`)
    }
    return (
        <div>
            {pageUser ? 
            <div>
                <h3>{pageUser.username}</h3>
                <img src={pageUser.avatar_info} alt={pageUser.username} />
                <p>{pageUser.about}</p>
                <div className="userStudies">
                    {studies ? studies.map(study => study.id === studyEdit ?
                    <EditStudyForm key={study.id} study={study} setStudyEdit={setStudyEdit} onStudyEdit={handleStudyEdit}/>
                    :
                    <StudyCard 
                    key={study.id} 
                    study={study} 
                    onDeleteStudy={handleDeleteStudiesState} 
                    setStudyEdit={setStudyEdit} 
                    studyClassName="studyCard"
                    onTagClick={(tag)=>onTagClick(tag)}
                    />
                    ) : null}
                </div>
            </div>
            : <h5>User Not Found</h5>}
          
        </div>
    )
}

export default Profile