import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DatabaseComponent from "./DatabaseComponent";
import DynamicRouteHandler from "./DynamicRouteHandler";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* Use <Routes> instead of <Switch> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<DynamicRouteHandler />} />
        </Routes>

      </div>
    </Router>
  );
}

function Home() {
  return ( 
  <div> 
     <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/steven2">steven2</Link>
          </li> */}
        </ul>
      </nav>
    <DatabaseComponent /> 
  </div>
  );
}