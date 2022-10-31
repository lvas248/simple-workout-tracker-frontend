import WorkoutForm from "./WorkoutForm"
import WorkoutTable from "./WorkoutTable"

function LogWorkout({URL, workouts, currentUser, renderExerciseOptions, addToWorkoutList}){


    return(
        <div>
            <WorkoutForm URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList}/>
            <WorkoutTable renderExerciseOptions={renderExerciseOptions} workouts={workouts}/>
        </div>
    ) 
}
export default LogWorkout 