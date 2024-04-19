import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import RoutardService from '../../services/RoutardService';

export default function DetailsSubdivisions() {
  const [detailsSubdivisions, setDetailsSubdivisions] = useState([]);
  const [pointsInterets, setPointsInterets] = useState([]);
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

  useEffect(() => {
    RoutardService.getPIbySubdivision(idSubdivision)
      .then(({ data }) => {
        setPointsInterets(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des PI :', error);
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
      <h1 className='text-[24px] m-3'>
        Points of interest in this subdivision :
      </h1>
      {pointsInterets.length === 0 ? (
        <Card>No points of interest in this subdivision</Card>
      ) : (
        pointsInterets.map((pi) => (
          <Card title={pi.nomPointInteret}>
            Type of point of interest : {pi.categories[0].nomCategorie}
          </Card>
        ))
      )}
    </>
  );
}
