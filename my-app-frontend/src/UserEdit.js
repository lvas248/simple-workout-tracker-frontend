import { useState } from 'react'

function UserEdit({URL, currentUser, clickEditBtn, updateUserList}){

    const [ editedUsername, setEditedUsername ] = useState(currentUser.user_name)

    function handleEdit(e){
        e.preventDefault()
        fetch(URL+`users/${currentUser.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'user_name': editedUsername
            })
        })
        .then(res => res.json())
        .then(data => updateUserList(data))
        clickEditBtn()
    }

    return(
       <form onSubmit={handleEdit}>
            <input value={editedUsername} onChange={e => setEditedUsername(e.target.value)}/>
            <button>Update</button>
       </form>
    )
}

export default UserEdit