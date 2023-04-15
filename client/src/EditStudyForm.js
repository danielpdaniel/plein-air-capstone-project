import { useState } from "react"

function EditStudyForm({study, setStudyEdit}){

    const [caption, setCaption] = useState(study.caption)

    function handleStudyEditSubmit(e){
        e.preventDefault()

        const patchBody = {
            caption: caption
        }

        fetch(`/studies/${study.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchBody)
        })
        .then(r => {
            if(r.ok){
                r.json().then(data => console.log(data))
            }
        })
    }
    
    return (
        <div className="studyCard">
            <form onSubmit={(e )=> handleStudyEditSubmit(e)}>

                <textarea value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                <input type="submit" value="Save Changes"/>
            </form>
            <button onClick={()=>setStudyEdit("")}>Cancel</button>
        </div>
    )
}

export default EditStudyForm