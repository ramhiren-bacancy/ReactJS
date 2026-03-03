import React, { useEffect, useState } from 'react'

const Que_1 = () => {
    const [users,SetUsers]= useState([])
    // const [name,setName]=useState('')
    const [count,setCount] = useState(30)

    // Infinite rendering
    // async function getUser() {
    //     const res = await fetch('https://api.github.com/users')
    //     const data = await res.json()
    //     SetUsers(data)
    //     console.log(data)
    // }
    // getUser()

    // useEffect(()=>{
    //   async function getUser() {
    //     const res = await fetch('https://api.github.com/users')
    //     const data = await res.json()
    //     SetUsers(data)
    //     console.log(data)
    // }
    // getUser()
    // },[])

    useEffect(()=>{
      async function getUser() {
        const res = await fetch(`https://api.github.com/users?per_page=${count}`)
        const data = await res.json()
        SetUsers(data)
        console.log(data)
    }
    getUser()
    },[count])

    function handleOnChange(e){
      // console.log(e.target.value.toUpperCase())\
      setCount(e.target.value)
    }
    
  return (
    <>
    <h1>GitHub Profile</h1>
    <input type="number" onChange={handleOnChange}/>
      <div style={{display:"flex",justifyContent:"center", alignItems:"center", flexWrap:"wrap", gap:"10px"}}>
        {
            users.map((user)=>(
                <img src={user.avatar_url} height={"100px"} width={"100px"}></img>
            ))
        }
      </div>    
    </>
  )
}

export default Que_1
