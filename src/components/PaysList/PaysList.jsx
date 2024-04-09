import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import RoutardService from '../../services/RoutardService';

export default function PaysList({ codeContinent }) {
  const [pays, setPays] = useState([]);

  useEffect(() => {
    RoutardService.getPaysByCodeContinent(codeContinent)
      .then((response) => {
        setPays(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des pays :', error);
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
        {pays.map((event) => (
          <Button
            label={truncateText(event.nomPays, 20)}
            className='p-button-raised w-36 h-12 bg-gray-700 text-white p-2 m-2'
          />
        ))}
      </div>
    </>
  );
}
