import './App.css';

import { Route, Routes } from "react-router-dom";
import LoginSignup from './LoginSignup';
import Home from './Home';
import NavBar from './NavBar';
import { UserProvider } from './context/user';
import UserProfile from './UserProfile';
import PleinAirMap from './PleinAirMap';
import MyProfile from './MyProfile';
import Notifications from './Notifications';
import Study from './Study';
import Search from './Search';

function App() {

  return (
    <>
    <UserProvider>
      <NavBar/>
        <Routes>
          <Route path="/login" element={<LoginSignup/>}/>
          <Route path="/my_profile" element={<MyProfile/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/users/:id" element={<UserProfile/>}/>
          <Route path="/map" element={<PleinAirMap/>}/>
          <Route path="/studies/:id" element={<Study/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </UserProvider>
      </>
  );
}

export default App;
