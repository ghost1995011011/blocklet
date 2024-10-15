import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Profile from './pages/Profile';

function App() {
  return (
    <div className="app">
      <Profile />
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
