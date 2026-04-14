import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio.jsx';
import Profile from './Profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;