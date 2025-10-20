import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import PropertyRegistration from './pages/PropertyRegistration/PropertyRegistration'; 
import { CssBaseline } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<PropertyRegistration />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
