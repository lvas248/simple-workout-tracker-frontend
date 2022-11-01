import WorkoutTable from "./WorkoutTable"

function WorkoutHistory({workouts, addToWorkoutList, updateWorkoutOnList, deleteWorkoutFromList}){

    return (
        <div>
            <h2>Workout History</h2>
            <WorkoutTable workouts={workouts} addToWorkoutList={addToWorkoutList} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList}/>
        </div>
    )
}
export default WorkoutHistory