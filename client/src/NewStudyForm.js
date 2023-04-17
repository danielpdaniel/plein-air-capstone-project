import { useState } from "react"



function NewStudyForm({ latLng }){
    const [files, setFiles] = useState("")
    const [caption, setCaption] = useState("")
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState("")

    function handleFileChange(e){
        const loadedFiles = []

        for(const file of e.target.files){
            loadedFiles.push(file)
        }

        setFiles(loadedFiles)
    }

    function handleNewStudySubmit(e){
        e.preventDefault()
        const formData = new FormData()

        // formData.append("images", files[0])
        // for(const file of files){
        //     formData.append("images", file)
        // }
        // formData.append("images[]", files[0])
        // formData.append("images[]", files[1])
        for(const file of files){
            formData.append("images[]", file)
        }

        for(const tag of tags){
            formData.append("tags[]", tag)
        }
        
        // const testTags = ["wee", "woo"]
        // formData.append("tags", testTags)
        
        // formData.set("images", formData.getAll("images"))

        // console.log(formData.getAll("images"))

        formData.append("location_id", 1)

        formData.append("caption", caption)

        if(latLng){
            formData.append("latLng", latLng)
        }
       
        // for (const pair of formData.entries()) {
        //     // if (pair[0] == "images"){
        //     //     console.log(pair[0])
        //     //     console.log(pair[1])
        //     // }
        //     console.log("foo")
    
        //   }

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        
        // var xhr = new XMLHttpRequest;
        // xhr.open('POST', '/', true);
        // xhr.send(formElem)

        fetch("/studies", {
            method: "POST",
            body: formData
        })
        .then(r => {
            if(r.ok){
                r.json().then(data=>console.log(data))
            }else{
                r.json().then(data=>console.log(data))
            }
        })
    }

    function handleAddTag(e){
        e.preventDefault()
        const updatedTags = tags.includes(currentTag) ? tags : [...tags, currentTag]
        setTags(updatedTags)
        setCurrentTag("")
    }
return(
    <div>
        <form onSubmit={(e)=>handleNewStudySubmit(e)}>
            <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>
            <textarea value={caption} onChange={(e) =>setCaption(e.target.value)}/>
            <input type="submit"/>
        </form>
        {tags ? <p>{tags.map(tag => `#${tag}, `)}</p> : null}
        <form onSubmit={(e) => handleAddTag(e)}>
            <input type="text" value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} placeholder="add tags to your post!"/>
        </form>
    </div>
)
}

export default NewStudyForm
