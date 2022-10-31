import ExerciseListItem from "./ExerciseListItem"

function ExerciseList({URL, exercises, deleteExeciseFromList, updateExerciseOnList}){

    const renderExercises = exercises.map( exer =>{
        return <ExerciseListItem key={exer.id} exer={exer} URL={URL} deleteExeciseFromList={deleteExeciseFromList} updateExerciseOnList={updateExerciseOnList}/>
    })
    
    return (
        <div id='exerciseList'>
            <h2>Exercise List</h2>
            <ul>
                {renderExercises}
            </ul>
        </div>
    )
}

export default ExerciseList