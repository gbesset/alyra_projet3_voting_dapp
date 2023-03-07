
import { Header } from "./components/header/Header";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Voter} from './pages/protected/Voter';
import {Admin} from './pages/protected/Admin';
import {NotFound} from './pages/NotFound';

function App() {
  return (
   
      <div id="App">
        <BrowserRouter>
          <div className="container">
       
          <Header/>

          <Routes>
                  <Route index element={<Home/>} />

                  <Route path="/home" element={<Home />} />
                  <Route path="/voter" element={<Voter />} />
                  <Route path="/admin" element={<Admin />} />

                  <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
