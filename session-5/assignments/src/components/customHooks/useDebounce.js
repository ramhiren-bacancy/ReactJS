import { useState, useEffect } from "react"


function useDebounce(v, delay=500){
    const [value, setValue] = useState(v)

    useEffect(()=>{
        const timeout_id = setTimeout(()=>{
            setValue(v)
        },delay)


        return () => clearTimeout(timeout_id)
    },[v])

    return value
}

export default useDebounce