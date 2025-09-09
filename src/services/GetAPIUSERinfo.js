import axios from 'axios'
import React from 'react'

export  async function SetUserPhoto(Photos) {
  
    try {
        const {data} = await axios.put('https://linked-posts.routemisr.com/users/profile-data',Photos,{
        headers : {
            token : localStorage.getItem('token')
        }
    })
    console.log(data);
    
    return data
    } catch (error) {
        return error
    }


}

export  async function GetUserData() {
  
    try {
        const {data} = await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
        headers : {
            token : localStorage.getItem('token')
        }
    })
    console.log(data);
    
    return data
    } catch (error) {
        return error
    }




}
