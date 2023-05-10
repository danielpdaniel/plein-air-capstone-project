import { useContext, useState } from "react"
import EditStudyForm from "./EditStudyForm"
import StudyCard from "./StudyCard"
import { UserContext } from "./context/user"

function UserEditProfile({pageUser, studies, studyEdit, handleStudyEdit, handleDeleteStudiesState, setStudyEdit, onTagClick, setStudies, onNewComment, onDeleteComment, setEditProfileStatus}){
    const [username, setUsername] = useState(pageUser.username)
    const [about, setAbout] = useState(pageUser.about)
    const [avatar, setAvatar] = useState(pageUser.avatar)
    const [errors, setErrors] = useState("")

    const {setUser} = useContext(UserContext)

    function handleUserEditSubmit(e){
        e.preventDefault()
        const formData = new FormData()

        formData.append("username", username)
        formData.append("about", about)

        if(avatar !== pageUser.avatar){
        formData.append("avatar", avatar)
        }

        fetch(`users/${pageUser.id}`, {
            method: "PATCH",
            body: formData
        })
        .then(r => {
            if(r.ok){
                r.json().then(data=>{setUser(data); setEditProfileStatus(false); setErrors("")})
            }else{
                r.json().then(data => setErrors(data.errors))
            }
        })

    }
    return (
        <div>
            {pageUser ? 
            <div>
                {/* <h3>{pageUser.username}</h3>
                <img src={pageUser.avatar_info} alt={pageUser.username} className="profileAvatar"/>
                <p>{pageUser.about}</p> */}
                <form onSubmit={(e)=>handleUserEditSubmit(e)} className="userEditForm">
                    <label htmlFor="username">Username:</label>
                    <br></br>
                    <input name="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <br></br>

                    <label htmlFor="avatarSubmitField">Avatar:</label>
                    <br></br>
                    <input type="file" accept="image/*" name="avatarSubmitField" multiple={false} onChange={(e)=>setAvatar(e.target.files[0])}/>
                    <br></br>

                    <label htmlFor="about">About:</label>
                    <br></br>
                    <textarea name="about" value={about} onChange={(e)=>setAbout(e.target.value)}/>
                    <br></br>
                    <input type="submit" value="Submit"/>
                </form>

                {errors ? errors.map(error => <p>{error}</p>) : null}


                {/* {tagEntry ? 
            <button className="studyEditTags" onClick={()=>setTagEntry("")}>{tagEntry}  X</button> 
            : 
            <form onSubmit={(e)=>{e.preventDefault(); setTagEntry(tagFilter); setTagFilter("")}}>
                <input type="text" value={tagFilter} onChange={(e)=> setTagFilter(e.target.value)} placeholder="seach tag here..." />
                <input type="submit" value="search tag"/>
            </form>} */}

                    <br></br>

                <div className="userStudies">
                    {studies ? studies.map(study => study.id === studyEdit ?
                    <EditStudyForm 
                    key={study.id} 
                    study={study} 
                    setStudyEdit={setStudyEdit} 
                    onStudyEdit={handleStudyEdit} 
                    editFormClassName="studyCard"/>
                    :
                    <StudyCard 
                    key={study.id} 
                    study={study} 
                    onDeleteStudy={handleDeleteStudiesState} 
                    setStudyEdit={setStudyEdit} 
                    studyClassName="studyCard"
                    // onTagClick={(tag)=>setTagEntry(tag.name)}
                    onNewComment={onNewComment}
                    onDeleteComment={onDeleteComment}
                    />
                    ) : null}
                </div>
            </div>
            : <h5>User Not Found</h5>}
          
        </div>
    )
}

export default UserEditProfile