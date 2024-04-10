import axios from 'axios';

const RoutardService = {
  getContinentname: () => {
    return axios.get('/api/continents');
  },

  getPaysByCodeContinent: (continentCode) => {
    return axios.get(`/api/continents/${continentCode}/pays`);
  },

  getPaysByCodeIso: (codeIso31661) => {
    return axios.get(`/api/pays/${codeIso31661}`);
  },

  getInformationByPays: (codeIso31661) => {
    return axios.get(`/api/pays/${codeIso31661}/informations`);
  },
};

export default RoutardService;
