
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./routes/AppRouter";
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <BrowserRouter>
          <AppRouter/>          
    </BrowserRouter>
  );
}

export default App;
