
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/CSS/App.css'
import { Home } from './pages/Home/Home'
import { IniciarSesion } from './pages/Home/Components/IniciarSesion'
import { Registro } from './pages/Home/Components/Registro'
import { Welcome } from './pages/Welcome/Welcome'
import { MyProvider } from './context/UserDataContext'
import { ChatMaya } from './pages/Chats/ChatMaya'

function App() {
 

  return (
    <>
    <MyProvider>
   <BrowserRouter>
   <Routes>

    <Route path='/' element={<Home />}/>
    <Route path='/IniciarSesion' element={<IniciarSesion/>}/>
    <Route path='/Registro' element={<Registro/>}/>
    <Route path='/Welcome' element={<Welcome/>}/>
    <Route path='/ChatMaya' element={<ChatMaya/>}/>

    
   </Routes>
   </BrowserRouter>
   </MyProvider>
    </>
  )
}



export default App
