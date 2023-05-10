import { useState, useContext } from "react"
import { UserContext } from "./context/user"
import { useNavigate } from "react-router-dom"

function LoginSignup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

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
                    navigate("/")
                })
            }else{
                r.json()
                .then(data => setErrors(data.errors))
            }})
    }

    function handleSignup(e){
        e.preventDefault()
        const newUser = {
            username: username,
            password: password
        }
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(r =>{
            if(r.ok){
                r.json().then(data => 
                {    setUser(data);
                    setErrors("");
                    setUsername("");
                    setPassword("");
                    navigate("/")
                })
            }else{
                r.json().then(data => setErrors(data.errors))
            }
        })
    }

    function handleLogout(){
        fetch("/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r=>{
            if(r.ok){
                setUser("")
            }
        })
    }


    return(
        <div>
            {!user ? <div>
            <h2>Login or Signup</h2>
            <form onSubmit={(e)=>handleLoginSubmit(e)}>
                <label htmlFor={"username"}>Username:</label>
                    <input type="text" value={username} name="password" placeholder="enter username here..." onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor={"password"}>Password:</label>
                    <input type="password" value={password} id={2} placeholder="enter password here..." onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit" value="Login"/>
                <button onClick={(e)=>handleSignup(e)}>Sign Up</button>
            </form>
            {errors ? errors.map(error => <h4 key={error}>{error}</h4>) : null}
        </div>  
        : 
        <div>
            <br></br>
            <button onClick={handleLogout}>Logout</button>
        </div>}
        </div>
    )
}

export default LoginSignup