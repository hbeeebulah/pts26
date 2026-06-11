import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// Temporarily hidden — pages kept in codebase
// import Schedule from './pages/Schedule';
// import Speakers from './pages/Speakers';
// import Awards from './pages/Awards';
import Registration from './pages/Registration';
// import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import './App.css';

function ScrollToTop() {
  const { pathname } = window.location;
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Temporarily hidden — pages kept in codebase */}
            {/* <Route path="/schedule" element={<Schedule />} /> */}
            {/* <Route path="/speakers" element={<Speakers />} /> */}
            {/* <Route path="/awards" element={<Awards />} /> */}
            <Route path="/registration" element={<Registration />} />
            {/* <Route path="/sponsors" element={<Sponsors />} /> */}
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
