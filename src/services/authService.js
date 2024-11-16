import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


const LogInServices = {
  getLogIn: async (loginData) => {
    try{
      const response = await axios.post(`${BASE_URL}/api/v1/user/login`, loginData);
      return response
    }catch(error){
       console.log("Error Authenticating User")
       throw error;
    }
  }
}

export default LogInServices;