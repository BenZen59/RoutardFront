import axios from 'axios';

const RoutardService = {
  getContinentname: () => {
    return axios.get('/api/continents');
  },

  getPaysByCodeContinent: (continentCode) => {
    return axios.get(`/api/continents/${continentCode}/pays`);
  },

  getPays: () => {
    return axios.get('/api/pays');
  },

  getPaysByCodeIso: (codeIso31661) => {
    return axios.get(`/api/pays/${codeIso31661}`);
  },

  getInformationByPays: (codeIso31661) => {
    return axios.get(`/api/pays/${codeIso31661}/informations`);
  },

  getSubdivisionsByPays: (codeIso31661) => {
    return axios.get(`/api/pays/${codeIso31661}/subdivisions`);
  },

  getSubdivisionById: (idSubdivision) => {
    return axios.get(`/api/subdivisions/${idSubdivision}`);
  },

  getPIbySubdivision: (idSubdivision) => {
    return axios.get(
      `/api/pointsinterets/search?idSubdivision=${idSubdivision}`
    );
  },
};

export default RoutardService;
