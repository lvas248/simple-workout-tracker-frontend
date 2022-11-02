import WorkoutTable from "./WorkoutTable"
import { useState } from 'react'

function WorkoutHistory({URL, currentUser, renderExerciseOptions, workouts, updateWorkoutOnList, deleteWorkoutFromList}){

    //Maybe add a filter or search or reorder??
    const [ reorderBtnClick, setReorderBtnClick ] = useState(false)
    const [ searchText, setSearchText ] = useState('')

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

    reorderBtnClick ? oldestFirst(workouts) : newestFirst(workouts)


    return (
        <div id='workoutHistory'>
            <h2>Workout History</h2>
            <button onClick={clickReorderBtn}>Re-order</button>
            <input placeholder='workout' />
            <WorkoutTable URL={URL} workouts={workouts} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList}/>
        </div>
    )
}
export default WorkoutHistory

