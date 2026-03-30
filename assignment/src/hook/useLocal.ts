import { useEffect, useState } from "react"

function init<T>(key:string,initialValue:T){
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
}


function useLocal<T>(key:string,initialValue:T):[T,React.Dispatch<React.SetStateAction<T>>]{
    const [value,setValue] = useState<T>(init(key,initialValue))

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value])

    return [value,setValue]

}

export default useLocal