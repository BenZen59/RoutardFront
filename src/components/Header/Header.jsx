import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoutardService from '../../services/RoutardService';
import PaysList from '../PaysList/PaysList';
import Search from '../Search/Search';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaMapLocationDot } from 'react-icons/fa6';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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
              <FaMapLocationDot className='mr-1 text-[24px]' />
              Continents <IoMdArrowDropdown className='ml-1 text-[15px]' />
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
            <Link to={`/pointsinterets`}>
              <button className='p-button rounded-md ml-6 p-[10px]'>
                <AiOutlineExclamationCircle className='mr-1 text-[24px]' />
                Points of interest
              </button>{' '}
            </Link>
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
