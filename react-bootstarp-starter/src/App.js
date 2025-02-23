import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
    <div id="wrapper">
      <Sidebar/>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Header/>
          <Content/>
          <Footer/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
