import WorkoutTable from "./WorkoutTable"
import { useState } from 'react'

function WorkoutHistory({URL, currentUser, renderExerciseOptions, workouts, updateWorkoutOnList, deleteWorkoutFromList}){

    //Maybe add a filter or search or reorder??
    const [ reorderBtnClick, setReorderBtnClick ] = useState(false)
    const [ exerciseFilter, setExerciseFilter ] = useState(0)

    function clickReorderBtn(){
        setReorderBtnClick(!reorderBtnClick)
    }

    function oldestFirst(array){
        array.sort((a,b)=>{
            if( a.id < b.id) return 1
            else return -1
        })
    }

    function newestFirst(array){
        array.sort((a,b)=>{
            if( a.id > b.id) return 1
            else return -1
        })
    }

    function handleChange(e){
        setExerciseFilter(parseInt(e.target.value))
    }

    const filteredByExercise = workouts.filter( wrk =>{
        if(exerciseFilter > 0) return wrk.exercise_id === exerciseFilter
        else return wrk
    })

    reorderBtnClick ? oldestFirst(filteredByExercise) : newestFirst(filteredByExercise)


    return (
        <div id='showPanel'>
            <h2>Workout History</h2>

            <div id='filter'>
                <label>Filter By Exercise: </label>
                <select onChange={handleChange}>
                    <option value='0'>All</option>
                    {renderExerciseOptions}
                </select>
                <button onClick={clickReorderBtn}>Re-order</button>
            </div>

            <WorkoutTable URL={URL} workouts={filteredByExercise} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList}/>
        </div>
    )
}
export default WorkoutHistory

