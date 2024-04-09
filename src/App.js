import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import DetailsPays from './components/DetailsPays/DetailsPays';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detailspays' element={<DetailsPays />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
