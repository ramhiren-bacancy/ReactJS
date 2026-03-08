import React, { useEffect, useState } from 'react'

const List = ({getItems}) => {
    const [items,setItems] = useState([])

    useEffect(()=>{
        setItems(getItems())
        console.log('Changing Values')
    },[getItems])
  return (
    <>
      {
        items.map((i,index)=>{
            return <div key={index}>
                {i}
            </div>
        })
      }
    </>
  )
}

export default List
