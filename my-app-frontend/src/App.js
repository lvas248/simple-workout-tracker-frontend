import './App.css';
import { useEffect, useState } from 'react'
import UserSelect from './UserSelect';


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

  return (
    <div className="App">
      <h1>Simple Workout Tracker</h1>

      <UserSelect URL={URL} users={users} addNewUserToUserList={addNewUserToUserList} handleUserChange={handleUserChange}/>

    </div>
  );
}

export default App;
