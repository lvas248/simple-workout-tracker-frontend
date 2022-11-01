import WorkoutTable from "./WorkoutTable"

function WorkoutHistory({URL, currentUser, renderExerciseOptions, workouts, updateWorkoutOnList, deleteWorkoutFromList}){

    return (
        <div id='workoutHistory'>
            <h2>Workout History</h2>
            <WorkoutTable URL={URL} workouts={workouts} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList}/>
        </div>
    )
}
export default WorkoutHistory

