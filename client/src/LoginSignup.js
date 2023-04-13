import { useState } from "react"

function LoginSignup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    function handleLoginSubmit(e){
        e.preventDefault()

        fetch("/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(r=>
            {if (r.ok){
                r.json()
                .then(data => console.log(data))
            }else{
                r.json()
                .then(data => console.log(data))
            }})
    }

    return(
        <div>
            <h2>Login or Signup</h2>
            <form onSubmit={(e)=>handleLoginSubmit(e)}>
                <label htmlFor={"username"}>Username:</label>
                    <input type="text" value={username} name="password" placeholder="enter username here..." onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor={"password"}>Password:</label>
                    <input type="text" value={password} id={2} placeholder="enter password here..." onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginSignup