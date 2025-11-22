import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import Test from "./Test.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
