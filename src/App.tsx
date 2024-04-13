import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Etapa1 from './components/Etapa1';
import Etapa2 from './components/Etapa2';
import Etapa3 from './components/Etapa3';
import Etapa4 from './components/Etapa4';
import Home from './components/Home';
import Etapa5 from './components/Etapa5';



function App() {

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/etapa1' element={<Etapa1 />} />
            <Route path='/etapa2' element={<Etapa2 />} />
            <Route path='/etapa3' element={<Etapa3 />} />
            <Route path='/etapa4' element={<Etapa4 />} />
            <Route path='/etapa5' element={<Etapa5 />} />
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
