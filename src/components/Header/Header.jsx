import { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import RoutardService from '../../services/RoutardService';
import PaysList from '../PaysList/PaysList';
import Search from '../Search/Search';

export default function Header() {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);

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

  function constructMenuModel(continents) {
    return continents.map((continent) => ({
      label: continent.nomContinent,
      command: () => setSelectedContinent(continent.codeContinent),
    }));
  }

  return (
    <>
      <Menubar
        model={constructMenuModel(continents)}
        className='border-b-2 border-black border-solid'
        end={<Search className='mr-[100px]' />}
      />
      <div className=' flex justify-center'>
        {selectedContinent && (
          <PaysList key={selectedContinent} codeContinent={selectedContinent} />
        )}
      </div>
    </>
  );
}
