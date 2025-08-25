import axios from 'axios'
import React from 'react'

export default async function UpdateCommentAPI(CommentID , EditeCountrol) {
  try {
    const {data} = await axios.put('https://linked-posts.routemisr.com/comments/' + CommentID ,{
      content : EditeCountrol
    },{
    headers:{
        token : localStorage.getItem('token')
    }
  })
  return data
  } catch (error) {
  return error
    
  }
}
