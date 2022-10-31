import WorkoutForm from "./WorkoutForm"
import WorkoutTable from "./WorkoutTable"

function LogWorkout({URL, workouts, currentUser, renderExerciseOptions, addToWorkoutList, deleteWorkoutFromList, updateWorkoutOnList}){


    return(
        <div>
            <WorkoutForm URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList}/>
            <WorkoutTable URL={URL} renderExerciseOptions={renderExerciseOptions} workouts={workouts} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
        </div>
    ) 
}
export default LogWorkout 