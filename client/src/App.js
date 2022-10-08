import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HackathonState from "./Context/HackathonState";
import Main from "./Pages/MainPage/Main";
import Header from './Components/Header/Header'
import Create from "./Pages/CreateHackathon/Create";
import Edit from "./Pages/EditPage/Edit";
import Details from "./Pages/DetailsPage/Details";

function App() {
  return (
    <HackathonState>

      <BrowserRouter>

        <Header />

        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/create" element={<Create />}></Route>
          <Route exact path="/edit" element={<Edit />}></Route>
          <Route exact path="/detail" element={<Details />}></Route>
        </Routes>

      </BrowserRouter>

    </HackathonState>
  );
}

export default App;
