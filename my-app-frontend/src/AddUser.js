import { useState } from 'react'

function AddUser({URL, addNewUserToUserList, clickAddBtn}){

//States
    const [ newUser, setNewUser ] = useState('')
    
//Functions
    function handleSubmit(e){
        e.preventDefault()
        fetch(URL+'users',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_name': newUser
            })
        })
        .then(res => res.json())
        .then(data => addNewUserToUserList(data))
        setNewUser('')
        clickAddBtn()
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input value={newUser} onChange={e => setNewUser(e.target.value)} placeholder='New username...'/>
            <button>Add</button>
        </form>
    )
}
export default AddUser