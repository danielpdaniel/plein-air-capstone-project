import { useState } from "react"

function EditStudyForm({study, setStudyEdit, onStudyEdit}){

    const [caption, setCaption] = useState(study.caption)
    const [files, setFiles] = useState('')

    function handleStudyEditSubmit(e){
        e.preventDefault()

        const formData = new FormData()

        formData.append("caption", caption)
        
        for(const file of files){
            formData.append("images[]", file)
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

        // const patchBody = {
        //     caption: caption
        // }

        // fetch(`/studies/${study.id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(patchBody)
        //     })
        //     .then(r => {
        //         if(r.ok){
        //             r.json().then(data => {
        //                 onStudyEdit(data)
        //                 setStudyEdit("")
        //             })
        //         }
        //     })
    }
    
    return (
        <div className="studyCard">
            <form onSubmit={(e )=> handleStudyEditSubmit(e)}>
                <input type="file" accept="image/*" multiple={true} onChange={(e)=>setFiles(e.target.files)}/>

                <textarea value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                <input type="submit" value="Save Changes"/>
            </form>
            <button onClick={()=>setStudyEdit("")}>Cancel</button>
        </div>
    )
}

export default EditStudyForm