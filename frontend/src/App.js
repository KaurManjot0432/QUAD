import './App.css';
import {Navbar} from './components/Navbar';
import { Home }from './components/Home';
import { About }from './components/About';
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
              </Routes>
            </div>
        </Router>
      </FormState>
    </>
  );
}

export default App;
