import { useState } from "react"


function NewStudyForm(){
    const [files, setFiles] = useState("")

    function handleNewStudySubmit(e){
        e.preventDefault()
        const formData = FormData()
        formData.append(files)

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
        <form>
            <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>
            <input type="submit"/>
        </form>
    </div>
)
}

export default NewStudyForm
