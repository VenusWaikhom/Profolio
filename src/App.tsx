import "./App.css";
import MainBackground from "./BackGround/MainBackground";
import Introduction from "./components/Introduction/Introduction";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Exp from "./components/Exp/Exp";
import Skill from "./components/Skill/Skill";
import Top from "./components/Top/Top";

function App() {
  return (
    <div className="App">
      <MainBackground />
      <Top />
      <Introduction />
      <About />
      <Exp />
      <Skill />
      <Contact />
    </div>
  );
}

export default App;
