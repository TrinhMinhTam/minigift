import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Messages from "./pages/Messages";
import Quiz from "./pages/Quiz";
import Timeline from "./pages/Timeline";
import Goodbye from "./pages/Goodbye";
import Info from "./pages/Info";
import VideoPage from "./pages/VideoPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-yellow-50 text-gray-800 font-sans">
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/goodbye" element={<Goodbye />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
