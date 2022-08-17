import React, { useState, useEffect } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'
export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    useEffect(() => {
        if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
            setTenzies(true)
        }
    }, [dice])
    const holdDice = (id) => {
        setDice(prevDice => prevDice.map(die => {
            return (die.id === id ? { ...die, isHeld: !die.isHeld } : die)
        }))
    }
    function allNewDice() {
        const newArrObj = []
        for (let i = 0; i < 10; i++) {
            newArrObj.push(generateNewDie())
        }
        return newArrObj
    }
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    const rollDice = () => {
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))
    }
    const newGame = () => {
        setTenzies(false)
        setDice(allNewDice())
    }
    return (
        <div className='container'>
            <div className='row d-flex justify-content-center align-items-center'>
                <main>
                    {tenzies && <Confetti />}
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="containers">
                        {dice.map(die => <Die {...die} key={die.id} holdDice={holdDice} />)}
                    </div>
                    {tenzies ? <button className='roll-btn' onClick={newGame}>New Game</button> : <button
                        onClick={rollDice}
                        className="roll-btn">
                        Roll
                    </button>}
                </main>
            </div>
        </div>
    )
}
