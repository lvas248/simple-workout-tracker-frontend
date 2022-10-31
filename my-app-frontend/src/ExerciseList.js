import ExerciseListItem from "./ExerciseListItem"
import { useState } from 'react'
import { click } from "@testing-library/user-event/dist/click"

function ExerciseList({URL, exercises, deleteExeciseFromList, updateExerciseOnList}){

    //state
    const [ addBtnClick, setAddBtnClick ] = useState(false)
    const [ newExerName, setNewExerName ] = useState('')

    //functions
    function clickAddBtn(){
        setAddBtnClick(!addBtnClick)
        setNewExerName('')
    }
    function handleAddExercise(e){
        e.preventDefault()
        fetch(URL+'exercises',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                exercise_name: newExerName
            })
        })
        .then( res => res.json())
        .then( data => console.log(data))
    }
    //render
    const renderExercises = exercises.map( exer =>{
        return <ExerciseListItem key={exer.id} exer={exer} URL={URL} deleteExeciseFromList={deleteExeciseFromList} updateExerciseOnList={updateExerciseOnList}/>
    })
    
    return (
        <div id='exerciseList'>
            <h2>Exercise List</h2>
            {addBtnClick ? <form onSubmit={handleAddExercise}><button onClick={clickAddBtn}>x</button><input value={newExerName} onChange={e=>setNewExerName(e.target.value)}/><button>Add</button></form> :<button onClick={clickAddBtn}>Add Exercise</button>}
            <ul>
                {renderExercises}
            </ul>
        </div>
    )
}

export default ExerciseList