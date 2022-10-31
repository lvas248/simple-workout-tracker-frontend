import { useState } from 'react'

function WorkoutTableRow({wrk, URL, renderExerciseOptions}){

    //State
    const [ editBtnClick, setEditBtnClick ] = useState(false)
    const [ workoutObj, setWorkoutObj ] = useState({
        "user_id": wrk.user_id,
        "exercise_id": wrk.exercise_id,
        "set_num": wrk.set_num,
        "reps": wrk.reps,
        "weight":wrk.weight
    })

    //Functions
    function clickEditBtn(){
        setEditBtnClick(!editBtnClick)
    }
    function handleChange(key, val){
        const copy = {...workoutObj}
        copy[key] = val || 0
        setWorkoutObj(copy)
    }
    function convertDate(date){
        return date.split('').slice(0,10).join('')
    }
    function handleDelete(){
        fetch(URL+`workouts/${wrk.id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    function handleUpdate(){
        fetch(URL+`workouts/${wrk.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(workoutObj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        clickEditBtn()
    }

    return (
        <tr>
        <td>{convertDate(wrk.created_at)}</td>
        <td>{editBtnClick ? <select value={workoutObj.exercise_name} onChange={e=>handleChange('exercise_id', parseInt(e.target.value))}>{renderExerciseOptions}</select>:wrk.exercise_name}</td>
        <td>{editBtnClick ? <input value={workoutObj.set_num} onChange={e=>handleChange('set_num', parseInt(e.target.value))}/> : wrk.set_num}</td>
        <td>{editBtnClick ? <input value={workoutObj.weight} onChange={e=>handleChange('weight', parseInt(e.target.value))}/> : wrk.weight}</td>
        <td>{editBtnClick ? <input value={workoutObj.reps} onChange={e=>handleChange('reps', parseInt(e.target.value))}/> : wrk.reps}</td>
        <td>
            {editBtnClick ? <button onClick={handleUpdate}>Submit</button> : <div><button onClick={clickEditBtn}>✍🏾</button><button onClick={handleDelete}>❌</button></div>}
        </td>
    </tr>    )
}
export default WorkoutTableRow


// Work through the console errors