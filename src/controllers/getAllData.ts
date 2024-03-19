import axios from 'axios';

export const getAllData = async(jwt:string) => {
  try {
  const {data}= await axios.get('https://store.mc-amc.com/app-store/api/apps/getAll',{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    })
    return data;
   
  } catch (error) {
    console.error('Error:', error);
  }

};