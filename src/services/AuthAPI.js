import axios from "axios";
import { useContext } from "react";

const APICALL = 'https://linked-posts.routemisr.com/users/'

export  async function SendToDataAPI(userData){

    try {
       let {data} = await axios.post(`${APICALL}signup` , userData)
        return data
   } catch (error) {
    return error.response.data
   }

}


export  async function GetDataFromAPI(LoginData){

    try {
       let {data} = await axios.post(`${APICALL}signin` , LoginData)
        return data
   } catch (error) {
    return error.response.data
   }

}



