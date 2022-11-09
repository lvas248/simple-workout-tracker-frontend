import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

// import UserSelect from './UserSelect';
import ExerciseList from './ExerciseList';
import LogWorkout from './LogWorkout';
import WorkoutHistory from './WorkoutHistory';


function App() {

  const URL = 'http://localhost:9292/'
  const history = useHistory()


//States
  const [ workouts, setWorkouts ] = useState([])
  const [ exercises, setExercises] = useState([])
  

//UseEffects
  useEffect(()=>{
    fetch(URL+'/workouts')
    .then(res => res.json())
    .then(data => setWorkouts(data))
  },[])

  useEffect(()=>{
    fetch(URL+'exercises')
    .then(res => res.json())
    .then(data => setExercises(data))
  },[])

//functions

  //Exercises CRUD
  function addExerciseToList(newExercise){
    const copy = [...exercises, newExercise]
    setExercises(copy)
  }

  function deleteExeciseFromList(deletedExercise){
    const updatedExerciseList = exercises.filter( exer =>{
      return exer.id !== deletedExercise.id
    })
    setExercises(updatedExerciseList)

    //delete all workouts who are associated with  deleted exercise
    const filteredWorkouts = workouts.filter( wrk =>{
      return wrk.exercise.exercise_name !== deletedExercise.exercise_name
    })

    setWorkouts(filteredWorkouts)
  
  }

  function updateExerciseOnList(updatedExercise){
    //update exerciseList state
    const updatedExerciseList = exercises.map( exer =>{
      if(exer.id === updatedExercise.id) return updatedExercise
      else return exer
    })
    setExercises(updatedExerciseList)
    //update state of workout list to change  exercise_name of each workout with updated exercis_name
    const updatedWorkoutList = workouts.map( wrk =>{
      if(wrk.exercise_id === updatedExercise.id){
        const updatedObj = {...wrk}
        updatedObj.exercise.exercise_name = updatedExercise.exercise_name
        return updatedObj
      }
      else return wrk
    })
    setWorkouts(updatedWorkoutList)
  }

  //Workout CRUD
  function addToWorkoutList(newWorkout){
      const updatedWorkoutList = [...workouts, newWorkout]
      setWorkouts(updatedWorkoutList)
  }

  function deleteWorkoutFromList(deletedWorkout){
    const updatedWorkoutList = workouts.filter( wrk =>{
      return wrk.id !== deletedWorkout.id
    })
    setWorkouts(updatedWorkoutList)
  }

  function updateWorkoutOnList(updatedWorkout){
    const udpatedWorkoutList = workouts.map( wrk =>{
      if(wrk.id === updatedWorkout.id) return updatedWorkout
      else return wrk
    })
    setWorkouts(udpatedWorkoutList)
  }

  //render
 
  const renderExerciseOptions = exercises.length > 0 ? exercises.map( exer => <option key={exer.id} value={exer.id}>{exer.exercise_name}</option>) : []

  return (
    <div className="App">
      <h1>Simple Workout Tracker</h1>

      <div id="container">

        <div id="leftPanel">
                    
          <ExerciseList exercises={exercises} URL={URL} addExerciseToList={addExerciseToList} deleteExeciseFromList={deleteExeciseFromList} updateExerciseOnList={updateExerciseOnList}/>
        
        </div>

        <div id="rightPanel">

          <div id='buttonsDiv'>
            <div className='btn' onClick={()=>history.push('/log-workout')}>Log Workout</div>
            <div className='btn' onClick={()=>history.push('/workout-history')}>View Workout History</div>
          </div>

          <div>
            <Switch id='showPanel'>

              <Route exact path='/'>
              </Route>

              <Route path='/log-workout'>
                  <LogWorkout URL={URL} workouts={workouts} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
              </Route>

              <Route path='/workout-history'>
                <WorkoutHistory URL={URL} renderExerciseOptions={renderExerciseOptions} workouts={workouts} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList} />
              </Route>  

            </Switch>
          </div>
       
        </div>
        
      </div>

    </div>
  );
}

export default App;
