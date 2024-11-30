import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import TanstackProvider from './Providers/TanstackProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import ToastNotification from './components/Toast';

function App() {
  return (
    <TanstackProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastNotification />
    </TanstackProvider >
  )
}

export default App
