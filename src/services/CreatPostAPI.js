import axios from 'axios'
import React from 'react'

export default async function CreatPostAPI(formData) {
  
    try {
        
      const {data} = await axios.post('https://linked-posts.routemisr.com/posts',formData,{
            headers : {
                token : localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error
    }
    
}
