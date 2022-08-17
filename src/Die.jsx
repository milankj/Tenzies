import React from 'react'


export default function Die(props){
    const bg = props.isHeld ? '#59E391' : 'white'
    return(
        <div className="die" style={{backgroundColor : bg}} onClick={()=>props.holdDice(props.id)}>
           <h2 className="die-num"> {props.value}</h2>
        </div>
    )
}