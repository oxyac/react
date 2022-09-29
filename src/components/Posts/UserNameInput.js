import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";


const UserNameInput = props => {
    const [username, setUsername] = useState('');
    const [firstCheck, setFirstCheck] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const inputChangeHandler = event => {
        setFirstCheck(false);
        setUsername(event.target.value);
    };
    useEffect(() => {

        const timerID = setTimeout(() => {

            checkUsername()
        }, 500)

        return () => {
            clearTimeout(timerID);
        }

    }, [username])

    const formSubmitHandler = event => {
        event.preventDefault();
        if(checkUsername()){
            props.onEnterUserName(username, 2);
        }
    };

    const checkUsername = () => {

        if(firstCheck){
            return false;
        }

        const regex = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/

        if (username.trim().length === 0) {
            setErrorMessage('Enter username')
            setIsValid(false);
            return false;
        }

        if (username.length < 6) {
            setErrorMessage('Username too short!')
            setIsValid(false);
            return false;

        }

        if (regex.test(username) === false) {
            setErrorMessage('Only a-z A-Z and - _ allowed')
            setIsValid(false);
            return false;
        }

        setErrorMessage('');
        setIsValid(true);
        return true;
    }

    return (<form onSubmit={formSubmitHandler}>
        <div className="form-control">
            <label htmlFor="username2" className="block">Username</label>
            <InputText
                id="username2"
                aria-describedby="username2-help"
                className={!isValid ? "p-invalid" : "block"}
                type="text"
                onChange={inputChangeHandler}
                style={{margin: "0 0 0 12px"}}
            />
            <br/>

        {!isValid ? <small id="username2-help" className="p-error block">{errorMessage}</small> :
                <small></small>}
        </div>
        <div style={{position: "relative", float: "right", margin: "10px 0 0 0 "}}>
            <Button type="submit">Submit</Button>
        </div>
    </form>);
};

export default UserNameInput;
