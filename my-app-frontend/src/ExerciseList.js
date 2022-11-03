import ExerciseListItem from "./ExerciseListItem"
import { useState } from 'react'

function ExerciseList({URL, currentUser, exercises, addExerciseToList, deleteExeciseFromList, updateExerciseOnList}){

    //state
    const [ addBtnClick, setAddBtnClick ] = useState(false)
    const [ newExerName, setNewExerName ] = useState('')

    //functions
    function clickAddBtn(){
        setAddBtnClick(!addBtnClick)
        setNewExerName('')
    }
    function handleSubmit(e){
        e.preventDefault()
        fetch(URL+'exercises',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                exercise_name: newExerName,
                user_id: currentUser.id
            })
        })
        .then( res => res.json())
        .then( data => addExerciseToList(data))
        clickAddBtn()
    }

    //render
    const renderExercises = exercises.map( exer =>{
        return <ExerciseListItem key={exer.id} exer={exer} URL={URL} deleteExeciseFromList={deleteExeciseFromList} updateExerciseOnList={updateExerciseOnList}/>
    })
    
    return (
        <div id='exerciseList'>
            <h2>Exercise List</h2>
            {addBtnClick ? <form onSubmit={handleSubmit}><button type='button' onClick={clickAddBtn}>x</button><input value={newExerName} onChange={e=>setNewExerName(e.target.value)}/><button>Add</button></form> : <button onClick={clickAddBtn}>Add Exercise</button>}
            
            <table id='exerTable'>
                <tbody>
                    {renderExercises}
                </tbody>
            </table>
        </div>
    )
}

export default ExerciseList