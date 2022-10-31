

function WorkoutForm(){

    return (
        <form>

            <div>

                <h2>Track Your Set</h2>

                <div>
                    <label>Select Exercise: </label>
                </div>

                <div>
                    <select>
                        <option>Select</option>
                    </select>
                </div>

                <label>Set Number:</label>

                <div>
                    <button type='button'>➖</button>
                    <h4>0</h4>
                    <button type='button'>➕</button>
                </div>

                <label>Weight: </label>

                <div>
                    <input></input>
                </div>

                <label>Reps: </label>

                <div>
                    <button type='button'>➖</button>
                    <input />
                    <button type='button'>➕</button>
                </div>   

            </div>

            <button>Submit</button>
        </form>
    )
}

export default WorkoutForm