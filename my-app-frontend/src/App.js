import './App.css';
import { useEffect, useState } from 'react'


function App() {

  const URL = 'http://localhost:9292/'

  const [ users, setUsers ] = useState([])
  const [ exercises, setExercises ] = useState([])
  const [ workouts, setWorkouts ] = useState([])

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

  return (
    <div className="App">
      Simple Workout Tracker
    </div>
  );
}

export default App;
