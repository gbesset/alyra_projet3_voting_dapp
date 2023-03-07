
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";

import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <div id="App">
          <div className="container">
            <BrowserRouter>
                <Header/>   
                <AppRouter/>          
            </BrowserRouter>
          </div>
      </div>
  );
}

export default App;
