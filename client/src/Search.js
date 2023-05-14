import { useEffect, useState } from "react"

function Search(){
    const [tagValue, setTagValue] = useState("")
    const [tagEntry, setTagEntry] = useState("")
    const [studies, setStudies] = useState("")
    const [errors, setErrors] = useState("")

    function handleSearchSubmit(e){
        e.preventDefault()
        setTagEntry(tagValue)
    }

    useEffect(()=>{
        if(tagEntry){
            fetch(`/tagged/${tagEntry}`)
            .then(r=>{
                if(r.ok){
                    r.json().then(data=>setStudies(data))
                }
                else{
                    r.json().then(data => setErrors(data.errors))
                }
            })
        }
    }, [tagEntry])

    console.log(studies)
    return(
        <div>
            <h2>Search Studies By Tag</h2>
            <form onSubmit={(e)=>handleSearchSubmit(e)}>
                <input type="text" value={tagValue} onChange={e => setTagValue(e.target.value)} placeholder="search tag..."/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Search