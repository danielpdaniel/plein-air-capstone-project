import './App.css';
import react from "react"
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

function App() {
  const [count, setCount] = useState("")
  useEffect(()=>{
    fetch("/hello")
    .then(r=>r.json())
    .then(data => setCount(data.count))
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/testing">
          <h1>TEST</h1>
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
