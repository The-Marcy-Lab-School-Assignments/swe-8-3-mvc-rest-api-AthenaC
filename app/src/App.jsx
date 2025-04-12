import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SongDetails from "./pages/SongDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/fellows/:id" element={<SongDetails />}></Route>
    </Routes>
  );
}

export default App;
