import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import Features from './component/Features';
import About from './component/About';
import Blog from './component/Blog';
import HowWorks from './component/HowWorks';
import {NoteContextProvider} from './context/NoteContext';
function App() {


  return (
    <>
    <NoteContextProvider>
      <Router>
    <div className="mainAppContainer ">
<Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feature" element={<Features />} />
          <Route path="/howWork" element={<HowWorks />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </div>
      </Router>
      </NoteContextProvider>
    </>
  )
}

export default App
