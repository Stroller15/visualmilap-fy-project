
import './App.css';
import { useState } from 'react';
import NoteState from './context/images/ImageState'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
import DashBoard from './components/DashBoard';
import Alert from './components/Alert';
import MainPage from './components/MainPage'
import FindYourPhotos from './components/FindYourPhotos';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type)=>{
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  return (
    <div>
      <NoteState>
      <Router>
      <Alert alert={alert}/>
        <Routes>
          <Route exact path='/' element={<MainPage/>}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path='/dashboard' element={<DashBoard showAlert={showAlert}/>}></Route>
          <Route exact path='/findyourphotos' element={<FindYourPhotos showAlert={showAlert}/>}></Route>
        </Routes>
      </Router>
      </NoteState>
    </div>
  )
}

export default App;
