import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import TanstackProvider from './Providers/TanstackProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import ToastNotification from './components/Toast';
import CheckAuth from './checkAuth';

function App() {
  return (
    <TanstackProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />

          {/* Protected route to ensure that only authenticated users can access tasks */}
          <Route path="/" element={<CheckAuth element={<Home />} />} index />
        </Routes>
      </Router>
      <ToastNotification />
    </TanstackProvider >
  )
}

export default App
