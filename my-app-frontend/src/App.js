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

  function addNewUserToUserList(editedUser){
    editedUser.push({workouts: []})
    setUsers([...users, editedUser])
  }

  function updateUserList(editedUser){
    editedUser.push({workouts: []})
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
  //find the selected user in the list of users and push new workout into their workout array
    const selectedUser = {...currentUser}
    selectedUser.workouts.push(newWorkout)
    //copy the state of users, replace currentUserObj with newUserObj
    const updatedUsers = users.map( user => {
      if(user.id === selectedUser.id) return selectedUser
      else return user
    })
    //set state with update user list
    setUsers(updatedUsers)
    // cycle through users, when current user appears, add new workout to their workouts
  }



  function deleteWorkoutFromList(deletedWorkout){
    //copy and update current user (remove deleted workout from it's workout list)
    const selectedUser = {...currentUser}
    selectedUser.workouts = selectedUser.workouts.filter( wrk => wrk.id !== deletedWorkout.id)
    //set current user state
    setCurrentUser(selectedUser)

    //copy userslist  and replace user with selectedUser
    const updatedUserList = users.map( user => {
      if(user.id === selectedUser.id) return selectedUser
      else return user
    })
    console.log(updatedUserList)
    //setUsers with updated user list
    setUsers(updatedUserList)
  }



  function updateWorkoutOnList(updatedWorkout){
    //create a copt of the current user and update the edited workout
    const currentUserCopy = {...currentUser}
    currentUserCopy.workouts = currentUserCopy.workouts.map( wrk => {
      if(wrk.id === updatedWorkout.id) return updatedWorkout
      else return wrk
    })
    //set state of currentUser as copy
    setCurrentUser(currentUserCopy)
    
    //create copy of user list and update with newly edited user obj
    const updatedUserList = users.map( user =>{
      if(user.id === updatedWorkout.user_id) return currentUserCopy
      else return user
    })
    //set state of users with new ly updated user list
    setUsers(updatedUserList)

  }

  //render
 
  const renderExerciseOptions = exercises.map( exer =>{
    return <option key={exer.id} value={exer.id}>{exer.exercise_name}</option>
  })  

  return (
    <div className="App">
      <h1>Simple Workout Tracker</h1>

      <div id="container">

        <div id="leftPanel">
          <UserSelect URL={URL} currentUser={currentUser} users={users} addNewUserToUserList={addNewUserToUserList} handleUserChange={handleUserChange} updateUserList={updateUserList} deleteUserFromList={deleteUserFromList}/>
                    
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
                  <LogWorkout URL={URL} workouts={currentUser.workouts} currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} addToWorkoutList={addToWorkoutList} deleteWorkoutFromList={deleteWorkoutFromList} updateWorkoutOnList={updateWorkoutOnList}/>
              </Route>

              <Route path='/workout-history'>
                <WorkoutHistory URL={URL}currentUser={currentUser} renderExerciseOptions={renderExerciseOptions} workouts={currentUser.workouts} updateWorkoutOnList={updateWorkoutOnList} deleteWorkoutFromList={deleteWorkoutFromList} />
              </Route>  

            </Switch>
          </div>
       
        </div>
        
      </div>

    </div>
  );
}

export default App;
