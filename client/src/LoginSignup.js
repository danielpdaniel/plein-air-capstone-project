import { useState, useContext } from "react"
import { UserContext } from "./context/user"

function LoginSignup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const {user, setUser} = useContext(UserContext)

    function handleLoginSubmit(e){
        e.preventDefault()

        fetch("/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(r=>
            {if (r.ok){
                r.json()
                .then(data => {
                    setUser(data)
                    setErrors("")
                    setUsername("")
                    setPassword("")
                })
            }else{
                r.json()
                .then(data => setErrors(data.errors))
            }})
    }

    return(
        <div>
            <h2>Login or Signup</h2>
            <form onSubmit={(e)=>handleLoginSubmit(e)}>
                <label htmlFor={"username"}>Username:</label>
                    <input type="text" value={username} name="password" placeholder="enter username here..." onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor={"password"}>Password:</label>
                    <input type="password" value={password} id={2} placeholder="enter password here..." onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
            {errors ? errors.map(error => <h4 key={error}>{error}</h4>) : null}
        </div>
    )
}

export default LoginSignup