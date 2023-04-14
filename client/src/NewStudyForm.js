import { useState } from "react"


function NewStudyForm(){
    const [files, setFiles] = useState("")

    function handleNewStudySubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append("images", files)
        formData.append("location_id", 1)

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
            <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files[0])}/>
            <input type="submit"/>
        </form>
    </div>
)
}

export default NewStudyForm
