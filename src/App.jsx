import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>  
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/About" element={<About />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
    </BrowserRouter>
  )
}
