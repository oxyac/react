import React, { useState } from 'react';


const UserNameInput = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const goalInputChangeHandler = event => {
        setEnteredValue(event.target.value);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        if(enteredValue.trim().length === 0){
            setIsValid(false);
            return;
        }
        props.onEnterUserName(enteredValue, 2);
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="form-control">
                <label style={{color: !isValid ? "red" : "black"}}>Username</label>
                <input style={{backgroundColor: !isValid ? "red" : "white" }} type="text" onChange={goalInputChangeHandler} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserNameInput;
