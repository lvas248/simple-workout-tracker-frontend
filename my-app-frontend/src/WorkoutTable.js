import WorkoutTableRow from "./WorkoutTableRow"

function WorkoutTable({URL, currentUser, renderExerciseOptions, workouts, deleteWorkoutFromList, updateWorkoutOnList}){
    const renderWorkouts = workouts.map( wrk => {
        return <WorkoutTableRow key={wrk.id} wrk={wrk} URL={URL} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
    })

    return (
        <div>

            <table id='wrkTable'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Exercise Name</th>  
                        <th>Set</th>
                        <th>Weight</th>
                        <th>Reps</th>     
                    </tr>
                   
                </thead>
                <tbody>
                    {renderWorkouts}
                </tbody>
            </table>
         
        </div>
    )
}
export default WorkoutTable