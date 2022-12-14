import WorkoutForm from "./WorkoutForm"
import WorkoutTable from "./WorkoutTable"

function LogWorkout({URL, workouts, currentUser, renderExerciseOptions, addToWorkoutList, deleteWorkoutFromList, updateWorkoutOnList}){

    const todaysWorkouts = workouts.filter( wrk => {
        return new Date(wrk.created_at).toDateString().includes(new Date().toDateString())
    })


    return(
        <div id='showPanel'>
            <WorkoutForm URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList}/>            
            <h2>Today's Workout</h2>
            <WorkoutTable URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} workouts={todaysWorkouts} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
        </div>
    ) 
}
export default LogWorkout 