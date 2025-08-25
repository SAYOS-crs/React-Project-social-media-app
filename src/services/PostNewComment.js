import axios from 'axios'
import React from 'react'

export default async function PostNewComment(CommentContent , postID) {
    console.log(CommentContent , postID);
    
    try {
        
     const {data} = await axios.post('https://linked-posts.routemisr.com/comments' , {
        content : CommentContent,
        post : postID
    },{
        headers:{
            token : localStorage.getItem('token')
        }
    })

    return data

    } catch (error) {
        
    }
   



}
