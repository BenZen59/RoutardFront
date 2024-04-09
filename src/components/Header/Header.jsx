import { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import RoutardService from '../../services/RoutardService';

export default function Header() {
  const [continents, setContinents] = useState([]);

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
      label: continent.nomContinent, // Supposons que le nom du continent est stocké dans une propriété 'nomContinent'
      // Vous pouvez ajouter d'autres propriétés comme 'url' si nécessaire pour rediriger vers une page spécifique
    }));
  }

  return (
    <>
      <Menubar model={constructMenuModel(continents)} />
    </>
  );
}
