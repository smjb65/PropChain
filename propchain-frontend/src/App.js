import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { CssBaseline } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
