import './App.css';
import react from "react"
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Routes,  NavLink} from "react-router-dom";
import LoginSignup from './LoginSignup';
import Home from './Home';
import NavBar from './NavBar';
import { UserProvider } from './context/user';
import UserProfile from './UserProfile';
import PleinAirMap from './PleinAirMap';
import MyProfile from './MyProfile';

function App() {
  const [count, setCount] = useState("")
  const [imageFile, setImageFile] = useState("")
  const [user, setUser] = useState("")




  useEffect(()=>{
    fetch("/hello")
    .then(r=>r.json())
    .then(data => setCount(data.count))
  }, [])

  useEffect(()=>{
    fetch(`/users`)
    .then(r=>r.json())
    .then(data=>setUser(data[0]))
  },[])
  

  function handleFileChange(e){
    setImageFile(e.target.files[0])
  }

  function handleUserEditSubmit(e){
    e.preventDefault()
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
      body: formData
    })
    .then(r=>r.json())
    .then(data=>setUser(data))
  }

  return (
    <>
    <UserProvider>
      <NavBar/>
        <Routes>
          <Route path="/login" element={<LoginSignup/>}/>
          <Route path="/my_profile" element={<MyProfile/>}/>
          <Route path="/users/:id" element={<UserProfile/>}/>
          <Route path="/map" element={<PleinAirMap/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </UserProvider>
      </>
  );
}

export default App;
