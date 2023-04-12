import './App.css';
import react from "react"
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

function App() {
  const [count, setCount] = useState("")
  const [imageFile, setImageFile] = useState("")
  const [user, setUser] = useState("")
  // const formElem = new FormData()

  // useEffect(()=>{
  //   fetch("/hello")
  //   .then(r=>r.json())
  //   .then(data => setCount(data.count))
  // }, [])
  

  function handleFileChange(e){
  
    setImageFile(e.target.files[0])
    // formElem.append("avatar", e.target.files[0], e.target.files[0].name)
    // formElem.append("grouchy", "margoo")
  }

  // formElem.append("mary", "jooby")
  // formElem.append("bingle", "dangle")
  // if(imageFile){
  //   formElem.append("avatar", imageFile)
  // }

  // var xhr = new XMLHttpRequest;
  // xhr.open('POST', '/', true);
  // xhr.send(formElem)

  function handleUserEditSubmit(e){
    e.preventDefault()
    console.log(imageFile)
    // console.log(JSON.stringify(formElem))
    const formData = new FormData()
    formData.append("random_test_data_sent_with_patch", "crobbit")
    formData.append("avatar", imageFile)
    const userPatchBody = {
      avatar: (imageFile),
      username: "hotdoggity",
      patty: "pattayyyyy",
      formData: formData
    }
  
    fetch("/users/1", {
      method: "PATCH",
      // headers: {
      //   "Content-Type": `application/json`,
      // },
      body: formData
    })
    .then(r=>r.json())
    .then(data=>console.log(data))
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/testing">
          <h1>TEST</h1>
        </Route>
        <Route path="/user">
          <div>
            <form onSubmit = {(e)=>handleUserEditSubmit(e)}>
              <input type="file" onChange={(e)=>handleFileChange(e)}/>
              <input type="submit"/>
            </form>
            {/* {imageFile ? <img src={URL.createObjectURL(imageFile)}/> : null} */}
            {user ? <img />: null}
          </div>
        </Route>
        <Route path="/">
          <div className="App">
            {count ? <h2>{count}</h2> : <h2>Loading...</h2>}
            <NavLink to="/testing">Testing</NavLink>
          </div>
        </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
