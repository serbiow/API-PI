import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Navbar from './pages/navbar/navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
