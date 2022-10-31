import WorkoutForm from "./WorkoutForm"
import TodaysWorkout from "./TodaysWorkout"

function LogWorkout({currentUser, renderExerciseOptions}){


    return(
        <div>
            <WorkoutForm currentUser={currentUser} renderExerciseOptions={renderExerciseOptions}/>
            <TodaysWorkout renderExerciseOptions={renderExerciseOptions}/>
        </div>
    ) 
}
export default LogWorkout 