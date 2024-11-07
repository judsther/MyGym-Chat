
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { IniciarSesion } from './pages/Home/Components/IniciarSesion'
import { Registro } from './pages/Home/Components/Registro'
import { Welcome } from './pages/Welcome/Welcome'
import { MyProvider } from './context/UserDataContext'
import { ChatMaya } from './pages/Chats/Maya/ChatMaya'
import { ChatTitanic1 } from './pages/Chats/Titanic1/ChatTitanic1'


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
    <Route path='/ChatTitanic1' element={<ChatTitanic1/>}/>

    
   </Routes>
   </BrowserRouter>
   </MyProvider>
    </>
  )
}



export default App
