import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import TanstackProvider from './Providers/TanstackProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import ToastNotification from './components/Toast';
import Signup from './pages/SignUp';
import { UserProvider } from './context/UserContext';
import CheckAuth from './CheckAuth';



function App() {
  return (
    <TanstackProvider>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* Protected route to ensure that only authenticated users can access tasks */}
            <Route path="/" element={<CheckAuth element={<Home />} />} index />
          </Routes>
        </UserProvider>
      </Router>
      <ToastNotification />
    </TanstackProvider >
  )
}

export default App
