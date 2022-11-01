import { useState } from 'react'

function ExerciseListItem({URL, exer, updateExerciseOnList, deleteExeciseFromList}){

    //state
    const [ exerciseName, setExerciseName ] = useState(exer.exercise_name)
    const [ editBtnClick, setEditBtnClick ] = useState(false)

    //functions
    function clickEditBtn(){
        setEditBtnClick(!editBtnClick)
    }

    function handleDelete(){
        fetch(URL+`exercises/${exer.id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => deleteExeciseFromList(data))
    }

    function handleEditSubmit(e){
        e.preventDefault()
        fetch(URL+`exercises/${exer.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                exercise_name: exerciseName
            })
        })
        .then(res => res.json())
        .then(data => updateExerciseOnList(data))
        clickEditBtn()
    }
    
    return(
        <tr className='listItem'>
            <td><h5>{exer.exercise_name}</h5></td>
            <td>
                {editBtnClick ? <form onSubmit={handleEditSubmit}><input value={exerciseName} onChange={e=>setExerciseName(e.target.value)}/><button>Update</button></form>:<button onClick={clickEditBtn}>✍🏾</button>}
                <button onClick={handleDelete}>❌</button>
            </td>
        </tr>
    )
}
export default ExerciseListItem