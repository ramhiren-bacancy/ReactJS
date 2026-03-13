import { useState } from "react";

function init(key,initialValue){

    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
}

function useLocalStorage(key,initialValue=""){
    const[value,setValue]=useState(init(key,initialValue))

    const saveValue = (value)=>{
        setValue(value)
        localStorage.setItem(key,JSON.stringify(value))
    }

    const retrieveValue = (key)=>{
        const item = localStorage.getItem(key)
        return item ?JSON.parse(item) : "Not Found"
    }

    return [value,saveValue,retrieveValue]
}


export default useLocalStorage