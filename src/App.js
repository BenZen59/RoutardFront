import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import DetailsPays from './components/DetailsPays/DetailsPays';
import DetailsSubdivisions from './components/DetailsSubdivisions/DetailsSubdivisions';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detailspays/:codeIso31661' element={<DetailsPays />} />
          <Route
            path='/detailssubdivisions/:idSubdivision'
            element={<DetailsSubdivisions />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
