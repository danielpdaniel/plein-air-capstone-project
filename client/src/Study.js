import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StudyCard from "./StudyCard"

function Study(){
    const params = useParams()
    const [study, setStudy] = useState("")

    useEffect(()=>{
        fetch(`/studies/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(data=>setStudy(data))
            }
        })
    }, [])
    
    return (
        <div>
            {study ? 
            <StudyCard study={study} studyClassName="studyCard"/>
            :
            <h5>Loading...</h5>}
        </div>
    )
}

export default Study