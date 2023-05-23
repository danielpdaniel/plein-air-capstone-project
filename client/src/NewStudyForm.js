import { useContext, useState } from "react"
import { UserContext } from "./context/user"



function NewStudyForm({ latLng, onNewMapStudyState }){
    const [files, setFiles] = useState("")
    const [caption, setCaption] = useState("")
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState("")
    const { user, setUser } = useContext(UserContext)
    const [errors, setErrors] = useState("")

    function handleNewStudySubmit(e){
        e.preventDefault()
        const formData = new FormData()

        for(const file of files){
            formData.append("images[]", file)
        }

        for(const tag of tags){
            formData.append("tags[]", tag)
        }
        

        formData.append("caption", caption)

        if(latLng){
            formData.append("latLng", latLng)
            formData.append("lat", latLng.lat())
            formData.append("lng", latLng.lng())
        }

        fetch("/studies", {
            method: "POST",
            body: formData
        })
        .then(r => {
            if(r.ok){
                r.json().then(data=>{
                    if(onNewMapStudyState){
                        onNewMapStudyState(data)
                }
                const updatedUser = {...user}
                updatedUser.studies = [data, ...user.studies]
                
                setUser(updatedUser)
                setFiles("")
                setCaption("")
                setCurrentTag("")
                setTags("")
                setErrors("")
            })
            }else{
                r.json().then(data=>setErrors(data.errors))
            }
        })
    }

    function handleAddTag(e){
        e.preventDefault()
        const updatedTags = tags.includes(currentTag) ? tags : [...tags, currentTag]
        setTags(updatedTags)
        setCurrentTag("")
    }

    function handleRemoveTag(tag){
        const updatedTags = tags.filter(thisTag => thisTag !== tag)
        setTags(updatedTags)
    }

return(
    <div className="newStudyForm">
        <form onSubmit={(e)=>handleNewStudySubmit(e)}>
            <input name="imageSubmit" type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>
            <br></br>
            <textarea value={caption} onChange={(e) =>setCaption(e.target.value)} placeholder="Add a description to your post!"/>
        </form>
        {tags ? tags.map(tag => <button key={tag} className="studyEditTags" onClick={()=>handleRemoveTag(tag)}>{tag}</button>) : null}
        <form onSubmit={(e) => handleAddTag(e)}>
            <input type="text" value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} placeholder="add tags to your post!"/>
        </form>
        <button onClick={handleNewStudySubmit}>Submit</button>
        {errors ? errors.map(error => <p key={error}>{error}</p>) : null}
    </div>
)
}

export default NewStudyForm
