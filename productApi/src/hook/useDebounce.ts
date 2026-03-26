import { useEffect, useState } from "react"

function useDebounce(query:string):[string,React.Dispatch<React.SetStateAction<string>>]{
    const [value,setValue] = useState("")

    useEffect(()=>{
        const time_id = setTimeout(() => {
            if(query.trim()==value)return
            setValue(query)
        }, 500);

        return (()=>clearTimeout(time_id))

    },[query])

    return [value,setValue]
}

export default useDebounce