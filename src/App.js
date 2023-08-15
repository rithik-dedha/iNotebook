import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react'



function App() {
  const [alert, setalert] = useState(null)
  

  const ShowAlert = (msg, t)=>{
    setalert({
      message: msg,
      type: t
  })  

  // alert will go off after 1.5s
  setTimeout(() => {
    setalert(null)
  }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route element={<Home ShowAlert = {ShowAlert}/>} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<Login ShowAlert = {ShowAlert}/>} path="/login" />
              <Route element={<Signup ShowAlert = {ShowAlert}/>} path="/signup" />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
