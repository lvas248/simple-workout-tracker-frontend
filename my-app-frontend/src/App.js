import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import UserSelect from './UserSelect';
import ExerciseList from './ExerciseList';
import LogWorkout from './LogWorkout';
import WorkoutHistory from './WorkoutHistory';


function App() {

  const URL = 'http://localhost:9292/'
  const history = useHistory()


//States
  const [ users, setUsers ] = useState([])
  const [ exercises, setExercises ] = useState([])
  const [ workouts, setWorkouts ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})

//UseEffects
  useEffect(()=>{
    fetch(URL+'/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  useEffect(()=>{
    fetch(URL+'/exercises')
    .then(res => res.json())
    .then(data => setExercises(data))
  },[])

  useEffect(()=>{
    fetch(URL+'/workouts')
    .then(res => res.json())
    .then(data => setWorkouts(data))
  },[])

//functions
  //User CRUD
  function handleUserChange(selectedUserId){
    if(selectedUserId !== ''){
      const selectedUser = users.find(user =>{
      return user.id === parseInt(selectedUserId)
      })
   
      setCurrentUser(selectedUser)
      history.push('/')
    }else{
      setCurrentUser({})
      history.push('/')
    }
  }
  function addNewUserToUserList(newUser){
    setUsers([...users, newUser])
  }
  function updateUserList(editedUser){
    const updatedList = users.map( user =>{
      if(user.id === editedUser.id) return editedUser
      else return user
    })
    setUsers(updatedList)
  }
  function deleteUserFromList(deletedUser){
    const updatedUserList = users.filter( user => {
      return user.id !== deletedUser.id
    })
    setUsers(updatedUserList)
    setCurrentUser({})
  }

  //Exercises CRUD
  function addExerciseToList(newExercise){
    setExercises([...exercises, newExercise])
  }
  function deleteExeciseFromList(deletedExercise){
    const updatedList = exercises.filter( exer =>{
      return exer.id !== deletedExercise.id
    })
    setExercises(updatedList)
  }
  function updateExerciseOnList(updatedExercise){
    const updatedList = exercises.map( exer =>{
      if(exer.id === updatedExercise.id) return updatedExercise
      else return exer
    })
    setExercises(updatedList)
  }
  //Workout CRUD

  function addToWorkoutList(newWorkout){
    newWorkout = addExerciseNameToWorkoutObject(newWorkout)
    setWorkouts([...workouts, newWorkout])
  }
  function deleteWorkoutFromList(deletedWorkout){
    const updatedList = workouts.filter( wrk =>{
      return wrk.id !== deletedWorkout.id
    })
    setWorkouts(updatedList)
  }
  function updateWorkoutOnList(updatedWorkout){
    updatedWorkout = addExerciseNameToWorkoutObject(updatedWorkout)
    const updatedList = workouts.map(wrk =>{
      if(wrk.id === updatedWorkout.id) return updatedWorkout
      else return wrk
    })
    setWorkouts(updatedList)
  }

 //other
  function addExerciseNameToWorkoutObject(workoutObj){
    //adds exercise name to workout obj, so that the object matched the format of the get requested data
    const exercise = exercises.find( exer => exer.id === workoutObj.exercise_id)
    workoutObj['exercise'] = {exercise_name: exercise.exercise_name}
    return workoutObj
  }

  //render
  const filteredWorkouts = workouts.filter( wrk => {
    return wrk.user_id === currentUser.id
  })
  const renderExerciseOptions = exercises.map( exer =>{
    return <option key={exer.id} value={exer.id}>{exer.exercise_name}</option>
  })  

  return (
    <div className="App">
      <h1>Simple Workout Tracker</h1>

      <div id="container">

        <div id="leftPanel">
          <UserSelect URL={URL} currentUser={currentUser} users={users} addNewUserToUserList={addNewUserToUserList} handleUserChange={handleUserChange} updateUserList={updateUserList} deleteUserFromList={deleteUserFromList}/>
          
        
          {/* {currentUser.id ? <div className='btn' onClick={()=>history.push('/log-workout')}>Log Workout</div> : null }
          {currentUser.id ? <div className='btn' onClick={()=>history.push('/workout-history')}>View Workout History</div> : null} */}
               
          
          {currentUser.id ? <ExerciseList exercises={exercises} URL={URL} addExerciseToList={addExerciseToList} deleteExeciseFromList={deleteExeciseFromList} updateExerciseOnList={updateExerciseOnList}/>: null}
        
        </div>

        <div id="rightPanel">

          <div id='buttonsDiv'>
            {currentUser.id ? <div className='btn' onClick={()=>history.push('/log-workout')}>Log Workout</div> : null }  
            {currentUser.id ? <div className='btn' onClick={()=>history.push('/workout-history')}>View Workout History</div> : null}
          </div>

          <div>
            <Switch id='showPanel'>

              <Route exact path='/'>
                  {currentUser.id ? null : <h2>Select or Add User</h2>}
              </Route>

              <Route path='/log-workout'>
                  <LogWorkout URL={URL} workouts={filteredWorkouts} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
              </Route>

              <Route path='/workout-history'>
                <WorkoutHistory URL={URL}currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} workouts={filteredWorkouts} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList} />
              </Route>  

            </Switch>
          </div>
       
        </div>
        
      </div>

    </div>
  );
}

export default App;
