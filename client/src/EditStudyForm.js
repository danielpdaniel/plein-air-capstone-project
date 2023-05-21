import { useState } from "react"

function EditStudyForm({study, setStudyEdit, onStudyEdit, editFormClassName}){

    const [caption, setCaption] = useState(study.caption)

    const [images, setImages] = useState(study.attached_images)
    const [files, setFiles] = useState('')
    const [imgsToPurge, setImgsToPurge] = useState([])
    const [mousedOverImg, setMousedOverImg] = useState("")

    const [tags, setTags] = useState(study.tags)
    const [currentTag, setCurrentTag] = useState("")
    const [newTags, setNewTags] = useState([])
    const [tagsToDelete, setTagsToDelete] = useState([])

    const [errors, setErrors] = useState("")

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

        for(const tag of tagsToDelete){
            formData.append("tags_to_delete[]", tag.id)
        }

        for(const tag of newTags){
            formData.append("tags[]", tag)
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
            }else{
                r.json().then(data => setErrors(data.errors))
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
        const updatedNewTags = newTags.filter(tag => tag !== tagToDelete.tag_name)
        setTags(updatedTags)
        setTagsToDelete(deleteTags)
        setNewTags(updatedNewTags)
    }

    function handleAddTag(e){
        e.preventDefault()

        // tags.forEach(tag =>{
        //    if(tag.tag_name === currentTag){
        //     console.log(tag.tag_name, currentTag)
        //     setCurrentTag("")
        //     return currentTag
        //    }else{
        //     setNewTags([...newTags, currentTag])
        //     setTags([...tags, {tag_name: currentTag}])
        //     setCurrentTag("")
        //    }
        // })

        const tagNames = tags.map(tag => tag.tag_name)

        if(!tagNames.includes(currentTag)){
            setNewTags([...newTags, currentTag])
            setTags([...tags, {tag_name: currentTag}])
            setCurrentTag("")
        }else{
            setCurrentTag("")
        }
    }
    // console.log(newTags)
    // console.log(caption)
    // console.log("images to delete:", imgsToPurge)
    // console.log("images still attached:", images)
    
    return (
        <div className={editFormClassName}>
            <form onSubmit={(e )=> handleStudyEditSubmit(e)}>

                {images.map(image => 
                    <div key={image.id} className="studyEditFormImageContainer">
                        {image.id === mousedOverImg ? <div className="xOutImg">X</div> : null}
                        <img src={image.img_url} onClick={()=>handleImageClick(image)} className="studyEditFormImage" onMouseOver={()=>setMousedOverImg(image.id)} onMouseOut={()=>setMousedOverImg(null)}/>
                    </div>
                )}

                <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>

                <textarea value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                {/* <input type="submit" value="Save Changes"/> */}
                <div>
                    {tags ? tags.map(tag => <button key={tag.tag_name} className="studyEditTags" onClick={()=>handleTagClick(tag)}>{tag.tag_name}  X</button>) : null}
                </div>
            </form>
            <form onSubmit={(e) => handleAddTag(e)}>
                <input type="text" value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} placeholder="add tags to your post!"/>
            </form>

            <button onClick={(e) => handleStudyEditSubmit(e)}>Save Changes</button>
            <button onClick={()=>setStudyEdit("")}>Cancel</button>
            {errors ? errors.map(error => <p key={error}>{error}</p>) : null}
        </div>
    )
}

export default EditStudyForm