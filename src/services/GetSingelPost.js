import axios from 'axios'
import React from 'react'

export default async function GetSingelPost(id) {
    
     try {
        
      const {data} = await axios.get('https://linked-posts.routemisr.com/posts/' + id,{
        headers:{
            token :localStorage.getItem('token')
        }
    })
        return data

    } catch (error) {
        return 'erorrrrrrr' + error
    }


}
