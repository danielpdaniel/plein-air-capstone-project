import { useState } from "react"



function NewStudyForm(){
    const [files, setFiles] = useState("")
    const [caption, setCaption] = useState("")

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
        
        // formData.set("images", formData.getAll("images"))

        // console.log(formData.getAll("images"))

        formData.append("location_id", 1)

        formData.append("caption", caption)
       
        for (const pair of formData.entries()) {
            // if (pair[0] == "images"){
            //     console.log(pair[0])
            //     console.log(pair[1])
            // }
            console.log("foo")
    
          }

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
return(
    <div>
        <form onSubmit={(e)=>handleNewStudySubmit(e)}>
            <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>
            <textarea value={caption} onChange={(e) =>setCaption(e.target.value)}/>
            <input type="submit"/>
        </form>
    </div>
)
}

export default NewStudyForm
