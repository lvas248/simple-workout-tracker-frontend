import { useState } from 'react'

function AddUser({URL}){

//States
    const [ newUser, setNewUser ] = useState('')
    
//Functions
    function handleSubmit(e){
        e.preventDefault()
        console.log('Success')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={newUser} onChange={e => setNewUser(e.target.value)} placeholder='New username...'/>
            <button>Add</button>
        </form>
    )
}
export default AddUser