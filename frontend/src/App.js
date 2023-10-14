import './App.css';
import {Navbar} from './components/Navbar';
import { Home }from './components/Home';
import { About }from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import FormState from './context/forms/FormState';

function App() {
  return (
    <>
      <FormState>
        <Router>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
            </Routes>
        </Router>
      </FormState>
    </>
  );
}

export default App;
