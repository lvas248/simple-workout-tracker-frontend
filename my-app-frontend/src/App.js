import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import UserSelect from './UserSelect';
import ExerciseList from './ExerciseList';
import LogWorkout from './LogWorkout';


function App() {

  const URL = 'http://localhost:9292/'

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
  //User
  function handleUserChange(selectedUserId){
    if(selectedUserId !== ''){
      const currentUser = users.find(user =>{
      return user.id === parseInt(selectedUserId)
      })
      setCurrentUser(currentUser)
      // history.push('/new-workout')
    }else{
      setCurrentUser({})
      // history.push('/')
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

  //Exercises
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

  return (
    <div className="App">
      <h1>Simple Workout Tracker</h1>

      <div id="container">

        <div id="leftPanel">
          <UserSelect URL={URL} currentUser={currentUser} users={users} addNewUserToUserList={addNewUserToUserList} handleUserChange={handleUserChange} updateUserList={updateUserList} deleteUserFromList={deleteUserFromList}/>
          {currentUser.id ? <ExerciseList exercises={exercises} URL={URL} addExerciseToList={addExerciseToList} deleteExeciseFromList={deleteExeciseFromList} updateExerciseOnList={updateExerciseOnList}/>: null}
        </div>

        <div id="rightPanel">
          <Switch>

            <Route exact path='/'>
                Default
            </Route>

            <Route path='/log-workout'>
                <LogWorkout />
            </Route>

            <Route path='/workout-history'>
                Workout history
            </Route>  
          
          </Switch>
        </div>
        
      </div>

    </div>
  );
}

export default App;
