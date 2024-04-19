import { useState, useEffect } from 'react';
import RoutardService from '../../services/RoutardService';
import PaysList from '../PaysList/PaysList';
import Search from '../Search/Search';

export default function Header() {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [handleList, setHandleList] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

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
    setShowSubMenu(false); // Affiche le sous-menu lors de la sélection d'un continent
  }

  function toggleSubMenu() {
    setShowSubMenu(!showSubMenu); // Bascule l'état pour afficher ou masquer le sous-menu
  }

  return (
    <>
      <header className='border-b-2 border-black border-solid p-3'>
        <div className='flex justify-between items-center'>
          <div>
            <button className='p-button ml-6 p-[10px]' onClick={toggleSubMenu}>
              Continents
            </button>
            {/* Sous-menu des continents */}
            {showSubMenu && (
              <div className='absolute mt-6 bg-white rounded-md shadow-lg border-gray-700 border-2 border-solid z-10'>
                {continents.map((continent) => (
                  <button
                    key={continent.codeContinent}
                    className={`block w-full py-2 px-4 text-left ${
                      selectedContinent === continent.codeContinent
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-900'
                    }`}
                    onClick={() =>
                      handleContinentSelect(continent.codeContinent)
                    }
                  >
                    {continent.nomContinent}
                  </button>
                ))}
              </div>
            )}
            <button className='rounded-md ml-6 p-[10px]'>
              Points of interest
            </button>
          </div>
          <div>
            <Search />
          </div>
        </div>
      </header>
      {handleList && (
        <div className='flex justify-center ml-44 mt-2 pt-3 pb-3 pl-[45px] border-gray-700 rounded-md border-solid border-2 w-[900px] h-auto'>
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
