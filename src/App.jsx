import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// Temporarily hidden — pages kept in codebase
// import Schedule from './pages/Schedule';
import Speakers from './pages/Speakers';
import SpeakerBio from './pages/SpeakerBio';
// import Awards from './pages/Awards';
import Registration from './pages/Registration';
// import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Temporarily hidden — pages kept in codebase */}
            {/* <Route path="/schedule" element={<Schedule />} /> */}
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/speakers/:id" element={<SpeakerBio />} />
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
