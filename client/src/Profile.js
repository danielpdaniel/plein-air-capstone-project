import StudyCard from "./StudyCard"
import EditStudyForm from "./EditStudyForm"

function Profile({pageUser, studies, studyEdit, handleStudyEdit, handleDeleteStudiesState, setStudyEdit}){
    console.log(studyEdit)

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
                    <StudyCard key={study.id} study={study} onDeleteStudy={handleDeleteStudiesState} setStudyEdit={setStudyEdit} studyClassName="studyCard"/>
                    ) : null}
                </div>
            </div>
            : <h5>User Not Found</h5>}
          
        </div>
    )
}

export default Profile