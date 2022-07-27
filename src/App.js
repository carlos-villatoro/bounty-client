import Home from "./components/pages/Home";
import Bounty from "./components/pages/Bounty";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      {/* header nave could be here */}
      <main>
        <Routes>
            <Route 
              path="/"
              element={<Home />}
            />

            <Route 
              path="/bounties/:id"
              element={<Bounty />}
            />

        </Routes>
      </main>
      {/* could be footer */}
    </Router>
  );
}

export default App;
