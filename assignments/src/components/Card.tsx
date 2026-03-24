import { useEffect, useState } from 'react'
import type { Post } from '../App'

type Props = {
    post:Post
}

type Comments = {
  body:string,
  likes:number
  user :{
    username :string
  }
}

const Card = ({post:p}:Props) => {
  const [showComment,setShowComment]= useState(false)
  const [comments,setComment] = useState<Comments[]>([])

  useEffect(()=>{
    fetchComment()
  },[showComment])

  async function fetchComment(){
    if(!showComment)return
    const res = await fetch(`https://dummyjson.com/posts/${p.id}/comments`)
    const data = await res.json()

    setComment(data.comments)
  }




  return (
    <div className="border p-4 rounded-md mb-3 flex flex-col justify-evenly">

      <h1 className="text-red-500 font-bold">
      </h1>

        Post Id :{p.id}
      <p className="font-semibold">
        Title :{p.title}
      </p>

      <p className="text-gray-600">
        Body : {p.body}
      </p>

      <p className="text-sm text-gray-500">
        User: {p.userId}
      </p>

      <p className="text-sm">
        Likes: {p.reactions?.likes ?? 0}
      </p>

      <p className="text-sm">
        Views : {p.views}
      </p>

      <button className='border ' onClick={() => setShowComment(!showComment)}>Comments</button>

      {showComment && 
      (
        comments.length == 0 ?( 
        <div> Not comment </div>
        ):

      comments.map((c)=>(
        <div>
          <p><b>username: </b>{c.user.username}</p>
          <h4><b>Comments : </b>{c.body}</h4>
          <h4><b>likes : </b>{c.likes}</h4>
          <hr />
        </div>
      )))}
    </div>
  )
}

export default Card