import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StudyCard from "./StudyCard"
import CommentWindow from "./CommentWindow"

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
        <div className="singleStudy">
            {study ? 
            <StudyCard study={study} studyClassName="singleStudyCard"/>
            :
            <h5>Loading...</h5>}
        </div>
    )
}

export default Study