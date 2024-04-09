import axios from 'axios';

const RoutardService = {
  getContinentname: () => {
    return axios.get('api/continents');
  },
};

export default RoutardService;
