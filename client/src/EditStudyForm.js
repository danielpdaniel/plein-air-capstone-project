import { useState } from "react"

function EditStudyForm({study, setStudyEdit, onStudyEdit}){

    const [caption, setCaption] = useState(study.caption)
    const [images, setImages] = useState(study.attached_images)
    const [tags, setTags] = useState(study.tags)
    const [tagsToDelete, setTagsToDelete] = useState([])
    const [files, setFiles] = useState('')
    const [imgsToPurge, setImgsToPurge] = useState([])

    function handleStudyEditSubmit(e){
        e.preventDefault()

        const formData = new FormData()

        formData.append("caption", caption)

        for(const file of files){
            formData.append("images[]", file)
        }

        for(const img of imgsToPurge){
            formData.append("images_to_purge[]", img.id)
        }

        fetch(`/studies/${study.id}`, {
            method: "PATCH",
            body: formData
        })
        .then(r => {
            if(r.ok){
                r.json().then(data => {
                    onStudyEdit(data)
                    setStudyEdit("")
                })
            }
        })
    }

    function handleImageClick(imageToDelete){
        const purgeImages = [...imgsToPurge, imageToDelete]
        const imgs = images.filter(image => image !== imageToDelete)
        setImages(imgs)
        setImgsToPurge(purgeImages)
    }

    function handleTagClick(tagToDelete){
        const deleteTags = [...tagsToDelete, tagToDelete]
        const updatedTags = tags.filter(tag => tag !== tagToDelete)
        setTags(updatedTags)
        setTagsToDelete(deleteTags)
    }
    // console.log("images to delete:", imgsToPurge)
    // console.log("images still attached:", images)
    
    return (
        <div className="studyCard">
            <form onSubmit={(e )=> handleStudyEditSubmit(e)}>

                {images.map(image => 
                    <div key={image.id} className="studyEditFormImageContainer">
                        <img src={image.img_url} onClick={()=>handleImageClick(image)} className="studyEditFormImage"/>
                    </div>
                )}

                <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>

                <textarea value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                <input type="submit" value="Save Changes"/>
                <div>
                    {tags ? tags.map(tag => <button key={tag.name} className="studyEditTags" onClick={()=>handleTagClick(tag)}>{tag.name}</button>) : null}
                </div>
            </form>
            <button onClick={()=>setStudyEdit("")}>Cancel</button>
        </div>
    )
}

export default EditStudyForm