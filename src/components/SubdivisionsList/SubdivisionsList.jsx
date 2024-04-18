import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import RoutardService from '../../services/RoutardService';

export default function SubdivisionsList({ codeContinent }) {
  const [subdivisions, setSubdivisions] = useState([]);

  useEffect(() => {
    RoutardService.get
      .then((response) => {
        setSubdivisions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des subdivisions :',
          error
        );
      });
  }, []);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  return (
    <>
      <div>
        {subdivisions.map((event) => (
          <Link to={`/detailssubdivisions/${event.idSubdivisions}`}>
            <Button
              key={event.codeIso31661}
              label={truncateText(event.nomPays, 20)}
              className='hover:p-button-raised w-36 h-12 hover:bg-gray-700 hover:text-white p-2 m-2'
            />
          </Link>
        ))}
      </div>
    </>
  );
}
