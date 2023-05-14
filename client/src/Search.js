import { useState } from "react"

function Search(){
    const [tagValue, setTagValue] = useState("")
    return(
        <div>
            <input type="text" value={tagValue} onChange={e => setTagValue(e.target.value)}/>
        </div>
    )
}

export default Search