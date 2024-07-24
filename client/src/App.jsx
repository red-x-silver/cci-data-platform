import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UploadDataset from './pages/UploadDataset';

export default function App() {
  return (
    <BrowserRouter>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"></link>
    <Header />
    <Routes>  
      <Route path="/" element={<Home />} />
      
      <Route element={<PrivateRoute />} >
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload-dataset" element={<UploadDataset />} />
      </Route>
      
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<SignIn />} />
      <Route path="/About" element={<About />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
    </BrowserRouter>
  )
}
