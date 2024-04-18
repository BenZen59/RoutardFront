import { useState, useEffect } from 'react';
import RoutardService from '../../services/RoutardService';
import PaysList from '../PaysList/PaysList';
import Search from '../Search/Search';

export default function Header() {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [handleList, setHandleList] = useState(false);

  useEffect(() => {
    RoutardService.getContinentname()
      .then((response) => {
        setContinents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des noms de continents :',
          error
        );
      });
  }, []);

  function handleContinentSelect(continentCode) {
    setSelectedContinent(continentCode);
    setHandleList(true);
  }

  return (
    <>
      <header className='border-b-2 border-black border-solid p-3'>
        <div className='flex justify-between items-center'>
          <div>
            {continents.map((continent) => (
              <button
                key={continent.codeContinent}
                className={`p-button ${
                  selectedContinent === continent.codeContinent
                    ? 'bg-gray-700 rounded-md text-white ml-6 p-[10px]'
                    : 'ml-6 p-[10px]'
                }`}
                onClick={() => handleContinentSelect(continent.codeContinent)}
              >
                {continent.nomContinent}
              </button>
            ))}
          </div>
          <div>
            <Search />
          </div>
        </div>
      </header>
      {handleList && (
        <div className='flex justify-center ml-16 mt-4 pt-3 pb-3 pl-[45px] border-gray-700 rounded-md border-solid border-2 w-[900px] h-auto'>
          {selectedContinent && (
            <PaysList
              key={selectedContinent}
              codeContinent={selectedContinent}
            />
          )}
        </div>
      )}
    </>
  );
}
