import AddUser from "./AddUser"
import UserEdit from "./UserEdit"

import { useState } from 'react'

function UserSelect({URL, users, currentUser, handleUserChange, addNewUserToUserList, updateUserList}){

    //States
    const [ addBtnClick, setAddBtnClick ] = useState(false)
    const [ editBtnClick, setEditBtnClick ] = useState(false)

    //Functions
    function clickAddBtn(){
        setAddBtnClick(!addBtnClick)
    }
    function clickEditBtn(){
        setEditBtnClick(!editBtnClick)
    }

    //renders
    const renderOptions = users.map( user => {
        return <option key={user.id} value={user.id}>{user.user_name}</option>
    })

    return (
        <div>

            <h2>Select User</h2>

            <div>
                <label>Select User: </label>
                <select onChange={(e)=>handleUserChange(e.target.value)}>
                    <option>Select</option>
                    {renderOptions}
                </select>
            </div>

            <div>
                
                {addBtnClick ? <AddUser URL={URL} addNewUserToUserList={addNewUserToUserList} clickAddBtn={clickAddBtn}/> : null}

                {currentUser.id ? null : <button onClick={clickAddBtn}>Add User</button>}

                {editBtnClick ? <UserEdit URL={URL} currentUser={currentUser} clickEditBtn={clickEditBtn} updateUserList={updateUserList}/> : null}
               
                {currentUser.id ? <div><button onClick={clickEditBtn} >Edit</button><button>Delete</button></div> : null}
            
            </div>

        </div>
    )
}
export default UserSelect