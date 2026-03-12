import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'

const Search = () => {
    const [search,setSearch] = useState("")
    const query = useDebounce(search,1000)

    useEffect(()=>{
        console.log("Search : ", query)
    },[query])


  return (
    <>
      <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} />
    </>
  )
}

export default Search
