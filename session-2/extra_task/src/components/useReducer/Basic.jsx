import React, { useReducer } from 'react'


function reducer (state,action){
    switch(action.type){
        case 'Plus':
            return {count:state.count +1 }
        case 'Minus':
            return {count: state.count-1}
        default:
            return {count}
    }
}

const Basic = () => {
    const[state,dispatch] = useReducer(reducer , {count :0 })

    function handlePlus(){
        dispatch({type : 'Plus'})
    }
    function handleMinus(){
        dispatch({type: 'Minus'})
    }

    
  return (
    <>
      <button onClick={handlePlus}>Plus</button>
        <p>{state.count}</p>
      <button onClick={handleMinus}>Minus</button>

    </>
  )
}

export default Basic
