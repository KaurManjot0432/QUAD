import './App.css';
import {Navbar} from './components/Navbar';
import { Home }from './components/Home';
import { About }from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import FormState from './context/forms/FormState';
import FormQuestions from './components/FormQuestions';

function App() {
  return (
    <>
      <FormState>
        <Router>
          <Navbar/>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path="/form/:formId" element={<FormQuestions/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
              </Routes>
            </div>
        </Router>
      </FormState>
    </>
  );
}

export default App;
