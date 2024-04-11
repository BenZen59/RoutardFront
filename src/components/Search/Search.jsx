import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import RoutardService from '../../services/RoutardService';
import ResultCard from '../ResultCard/ResultCard';
import { Button } from 'primereact/button';

export default function Search() {
  const [codeIso31661, setCodeIso31661] = useState('');
  const [pays, setPays] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    try {
      const result = await RoutardService.getPaysByCodeIso(codeIso31661);
      setPays(result.data);
      setNotFound(false);
    } catch (error) {
      console.error(error);
      setPays(null);
      setNotFound(true);
    }
  };

  return (
    <div>
      <input
        type='text'
        className='w-96 border-solid border-2 border-stone-700 p-1 text-base rounded-md'
        placeholder='Chercher un pays par son code iso 3166-1 ...'
        value={codeIso31661}
        onChange={(e) => setCodeIso31661(e.target.value)}
      />
      <Button
        label='Rechercher'
        className='text-white bg-gray-700 h-[35px] w-[140px] p-3 ml-3'
        icon={<FaSearch />}
        onClick={handleSearch}
      />

      {pays && <ResultCard pays={pays} />}
      {notFound && (
        <div className='mt-3 w-[300px] h-[50px] pl-3 pt-[0.02px] bg-gray-700 text-white rounded-md z-50'>
          <h1 className='text-2xl mt-3 w-[700px] h-10 overflow-hidden'>
            Aucun résultat
          </h1>
        </div>
      )}
    </div>
  );
}
