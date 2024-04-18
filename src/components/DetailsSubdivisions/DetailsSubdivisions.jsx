import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import RoutardService from '../../services/RoutardService';

export default function DetailsSubdivisions() {
  const [detailsSubdivisions, setDetailsSubdivisions] = useState([]);
  const { idSubdivision } = useParams();

  useEffect(() => {
    RoutardService.getSubdivisionById(idSubdivision)
      .then(({ data }) => {
        setDetailsSubdivisions(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération du détails de la subdivision :',
          error
        );
      });
  }, []);

  return (
    <>
      <h1 className='text-[32px] m-3'>
        Holidays in {detailsSubdivisions.nomSubdivision}
      </h1>
      <Card
        title='Details'
        className='m-3 p-3 rounded-md text-white bg-gray-700 w-[800px] '
      >
        <p>
          <DataTable value={[detailsSubdivisions]}>
            <Column field='codeIso31662' header='Code Iso 3166-2'></Column>
            <Column field='nomSubdivision' header='Nom Subdivision'></Column>
            <Column
              field='typeSubdivision.nomTypeSubdivision'
              header='Type de Subdivision'
            ></Column>
          </DataTable>
        </p>
      </Card>
    </>
  );
}
