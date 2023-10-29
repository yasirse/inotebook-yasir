import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import {Routes, Route} from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
      <NoteState>
      <Navbar />
      <div className="container">
      <Routes>
          <Route  exact   path="/" element={<Home/>}/>
          <Route  exact   path="/about" element={<About/>}/>
          <Route  exact   path="/login" element={<Login/>}/>
          <Route  exact   path="/signup" element={<Signup/>}/>
      </Routes>
      </div>
      </NoteState>
    </>
  );
}

export default App;
