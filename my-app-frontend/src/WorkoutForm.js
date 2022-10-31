import { render } from '@testing-library/react'
import { useState } from 'react'

function WorkoutForm({currentUser, renderExerciseOptions}){

    //state
    const [ workoutObj, setWorkoutObj ] = useState({
        'user_id': currentUser.id,
        'exercise_id': 0,
        'set_num': 1,
        'reps': 0,
        'weight': 0
    })

    //functions
    function updateWorkoutObjByKey(key, val){
        const copy = {...workoutObj}
        copy[key] = parseInt(val) || 0
        setWorkoutObj(copy)
    }
    function increment(key){
        const copy = {...workoutObj}
        copy[key] = copy[key] + 1
        setWorkoutObj(copy)
    }

    function decrement(key){
        const copy = {...workoutObj}
        copy[key] = copy[key] +-1
        if(copy[key] > 0) setWorkoutObj(copy)
    }


    //render
  

    return (
        <form>

            <div>

                <h2>Track Your Set</h2>

                <div>
                    <label>Select Exercise: </label>
                </div>

                <div>
                    <select value={workoutObj.exercise_id} onChange={e=>updateWorkoutObjByKey('exercise_id', e.target.value)}>
                        <option>Select</option>
                        {renderExerciseOptions}
                    </select>
                </div>

                <label>Set Number:</label>

                <div>
                    <button type='button' onClick={()=>decrement('set_num')}>➖</button>
                    <h4>{workoutObj.set_num}</h4>
                    <button type='button' onClick={()=>increment('set_num')}>➕</button>
                </div>

                <label>Weight: </label>

                <div>
                    <input></input>
                </div>

                <label>Reps: </label>

                <div>
                    <button type='button'>➖</button>
                    <input />
                    <button type='button'>➕</button>
                </div>   

            </div>

            <button>Submit</button>
        </form>
    )
}

export default WorkoutForm