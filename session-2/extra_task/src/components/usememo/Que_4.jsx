import React, { useState,useMemo } from 'react'
import Sum from './Sum';

const Que_4 = () => {
const [count, setCount] = useState(0);
const [number,setNumber] = useState(100000);

//  function calculatePrime(){
    
//     let total = 0;

//     if(number>1)
//       total++;

//     for(let i=3;i<=number;i++){
//       total++;
//       for(let j=2;j<i;j++){
//         if(i%j==0){
//           total--;
//           break;
//         }
//       }
//     }

//     return total;

//   }

    const total = useMemo(()=>{
    
    let total = 0;

    if(number>1)
      total++;

    for(let i=3;i<=number;i++){
      total++;
      for(let j=2;j<i;j++){
        if(i%j==0){
          total--;
          break;
        }
      }
    }

    return total;

  },[number])


  function handleClick(){
    console.log("Hello Ji");
  }

    // calculatePrime()

console.log("app render");

  return (
    <>
       <h1>Counter: {count}</h1>
       <button onClick={()=>setCount(count+1)}>Increment</button>

       <h2>Your Current Number: {number}</h2>
      <button onClick={()=>setNumber(number+10000)}>Increment Number</button>

       <h3>Total Prime Number: {total}</h3>
      <button onClick={handleClick}>Click</button>


      <Sum number={number}></Sum>
    </>
  )
}

export default Que_4
