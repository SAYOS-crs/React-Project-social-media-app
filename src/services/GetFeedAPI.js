import axios from 'axios'
import React from 'react'

export default async function GetFeedAPI() {

    try {
        
      const {data} = await axios.get('https://linked-posts.routemisr.com/posts',{
        headers:{
            token :localStorage.getItem('token')
        },
        params:{
            sort:'-createdAt'
        }
    })
        return data

    } catch (error) {
        return 'erorrrrrrr' + error
    }

}


