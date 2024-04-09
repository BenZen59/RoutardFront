import axios from 'axios';

const RoutardService = {
  getContinentname: () => {
    return axios.get('api/continents');
  },

  getPaysByCodeContinent: (continentCode) => {
    return axios.get(`api/continents/${continentCode}/pays`);
  },
};

export default RoutardService;
