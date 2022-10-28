import AddUser from "./AddUser"
import UserEdit from "./UserEdit"

import { useState } from 'react'

function UserSelect({users}){


    
    const renderOptions = users.map( user => {
        return <option key={user.id} value={user.id}>{user.user_name}</option>
    })

    return (
        <div>
            <h2>Select User</h2>
            <div>
                <label>Select User: </label>
                <select>
                    <option>Select</option>
                    {renderOptions}
                </select>
            </div>
        </div>
    )
}
export default UserSelect