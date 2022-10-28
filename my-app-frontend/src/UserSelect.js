import AddUser from "./AddUser"
import UserEdit from "./UserEdit"

import { useState } from 'react'

function UserSelect({URL, users, handleUserChange, addNewUserToUserList}){

    //States
    const [ addBtnClick, setAddBtnClick ] = useState(false)

    //Functions
    function clickAddBtn(){
        setAddBtnClick(!addBtnClick)
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
                <button onClick={clickAddBtn}>Add User</button>
            </div>

        </div>
    )
}
export default UserSelect