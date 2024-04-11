import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import RoutardService from '../../services/RoutardService';

export default function DetailsPays() {
  const [detailsPays, setDetailsPays] = useState([]);
  const [informations, setInformations] = useState([]);
  const { codeIso31661 } = useParams();
  console.log(detailsPays, codeIso31661);

  useEffect(() => {
    RoutardService.getPaysByCodeIso(codeIso31661)
      .then(({ data }) => {
        setDetailsPays(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération du détails du pays :',
          error
        );
      });
  }, []);

  useEffect(() => {
    RoutardService.getInformationByPays(codeIso31661)
      .then(({ data }) => {
        setInformations(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des informations du pays :',
          error
        );
      });
  }, []);

  console.log(informations);

  return (
    <>
      <div className='m-3 p-3 rounded-md text-white bg-gray-700 w-[500px]'>
        <h1 className='text-2xl'>Informations</h1>
        <p>
          {informations && informations.length > 0
            ? informations[0].info
            : 'Aucune information disponible'}
        </p>
      </div>

      <div className='text-center mt-20'>
        <DataTable value={[detailsPays]}>
          <Column field='codeIso31661' header='Code Iso 3166-1'></Column>
          <Column field='nomPays' header='Nom Pays'></Column>
          <Column
            field='continent.codeContinent'
            header='Code Continent'
          ></Column>
          <Column
            field='continent.nomContinent'
            header='Nom Continent'
          ></Column>
          <Column
            field='monnaie.codeIsoMonnaie'
            header='Code Iso Monnaie'
          ></Column>
          <Column field='monnaie.nomDevise' header='Nom Devise'></Column>
          <Column
            header='Langues'
            body={(rowData) => {
              return rowData.langues && rowData.langues.length > 0 ? (
                rowData.langues
                  .map((langue) => (
                    <span key={langue.isoLangue}>{langue.nomLangue}</span>
                  ))
                  .reduce((prev, curr) => [prev, ', ', curr])
              ) : (
                <span>Aucune langue spécifiée</span>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}
