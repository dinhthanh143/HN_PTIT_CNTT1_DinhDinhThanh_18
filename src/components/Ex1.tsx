import React, { useReducer } from 'react'
type Action = {
    type: string,
    payload?: unknown
}
export const Ex1 = () => {
     const reducer = (state: number, action : Action):number =>{
        switch(action.type){
            case "increase":
                return state +1
                break;
            default:
                return state
        }
    }
    const [count,dispatch] = useReducer(reducer, 0)
   
  return (
    <div>
        <span>{count}</span>
        <button onClick={()=>dispatch({type: "increase"})} >increase</button>
    </div>
  )
}
