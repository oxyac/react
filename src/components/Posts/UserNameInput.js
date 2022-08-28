import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";


const UserNameInput = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const goalInputChangeHandler = event => {
        setEnteredValue(event.target.value);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        if (enteredValue.trim().length === 0) {
            setIsValid(false);
            return;
        }
        props.onEnterUserName(enteredValue, 2);
    };

    return (<form onSubmit={formSubmitHandler}>
        <div className="form-control">
            <label htmlFor="username2" className="block">Username</label>
            <InputText
                id="username2"
                aria-describedby="username2-help"
                className={!isValid ? "p-invalid" : "block"}
                type="text"
                onChange={goalInputChangeHandler}
                style={{margin: "0 0 0 12px"}}
                />
            {!isValid ? <small id="username2-help" className="p-error block">Username is not available.</small> :
                <small></small>}
        </div>
        <div style={{position: "relative", float: "right", margin: "10px 0 0 0 "}}>
            <Button type="submit">Submit</Button>
        </div>
    </form>);
};

export default UserNameInput;
