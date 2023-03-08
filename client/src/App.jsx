
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";

import { AppRouter } from "./routes/AppRouter";
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <BrowserRouter>
      <Header/> 
  
      <div className="container">
            <AppRouter/>          
      </div>
    </BrowserRouter>
  );
}

export default App;
