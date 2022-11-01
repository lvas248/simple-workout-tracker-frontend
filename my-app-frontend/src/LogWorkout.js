import WorkoutForm from "./WorkoutForm"
import WorkoutTable from "./WorkoutTable"

function LogWorkout({URL, workouts, currentUser, renderExerciseOptions, addToWorkoutList, deleteWorkoutFromList, updateWorkoutOnList}){

    const today = new Date()
    const todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    const todaysWorkouts = workouts.filter( wrk => {
        return wrk.created_at.includes(todayFormatted)
    })

    return(
        <div>
            <WorkoutForm URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList}/>            
            <h2>Today's Workout</h2>
            <WorkoutTable URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} workouts={todaysWorkouts} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
        </div>
    ) 
}
export default LogWorkout 