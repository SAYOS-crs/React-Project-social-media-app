import axios from 'axios'
import React from 'react'

export default async function DeletePostAPI(PostID) {
    try {
        const {data} = await axios.delete('https://linked-posts.routemisr.com/posts/'+PostID , {
    headers : {
        token : localStorage.getItem('token')
    }
        })
        return data
    } catch (error) {
         return error
    }
  
}
export async function DeleteAPIComment (CommentID) {
    try {
        const {data} = await axios.delete('https://linked-posts.routemisr.com/comments/'+CommentID , {
    headers : {
        token : localStorage.getItem('token')
    }
        })
        return data
    } catch (error) {
         return error
    }
  
}
