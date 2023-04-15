import { useState } from "react"

function EditStudyForm({study, setStudyEdit, onStudyEdit}){

    const [caption, setCaption] = useState(study.caption)
    const [images, setImages] = useState(study.attached_images)
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
    console.log("images to delete:", imgsToPurge)
    console.log("images still attached:", images)
    
    return (
        <div className="studyCard">
            <form onSubmit={(e )=> handleStudyEditSubmit(e)}>

                {images.map(image => 
                <div key={image.id}>
                    <img src={image.img_url} onClick={()=>handleImageClick(image)} className="studyEditFormImage"/>
                </div>
                )}

                <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>

                <textarea value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                <input type="submit" value="Save Changes"/>
            </form>
            <button onClick={()=>setStudyEdit("")}>Cancel</button>
        </div>
    )
}

export default EditStudyForm