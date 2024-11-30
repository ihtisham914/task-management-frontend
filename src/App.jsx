import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import TanstackProvider from './Providers/TanstackProvider';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <TanstackProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TanstackProvider >
  )
}

export default App
