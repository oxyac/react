import UserNameInput from "./UserNameInput";
import React from "react";
import {Button} from "primereact/button";
import {GridContainer, GridElementLeft, GridElementRight, LoginAbsolute, LoginP} from "../UI/StyledComponents";
//
// function LogoutButton(props) {
//     return (<button onClick={props.onClick}>
//         Logout
//     </button>);
// }


class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timerID: null
        };
    }

    initiateLogin() {
        console.log(this.props.userDetails.accessLevel)
        const timerID = setInterval(() => {
            // console.log(this.state.timeLoggedIn);
            this.props.setUserDetails({
                ...this.props.userDetails, timeLoggedIn: this.props.userDetails.timeLoggedIn + 1
            });
        }, 1000)

        this.setState({
            timerID: timerID
        })

    }

    handleLoginClick(username, access = 1) {
        this.props.setUserDetails({
            ...this.props.userDetails, username: username, accessLevel: access
        })

        this.initiateLogin();
    }

    handleLogoutClick() {

        clearInterval(this.props.userDetails.timerID);
        this.props.setUserDetails({
            ...this.props.userDetails, username: '', accessLevel: 0, timeLoggedIn: 0, timerID: null
        });
    }

    componentDidMount() {
        if (this.props.userDetails.accessLevel !== 0) {
            this.initiateLogin();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.timerID === null) {
            this.initiateLogin();
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
        this.setState({
            timerID: null
        })
    }


    render() {
        return (<>
            {this.props.userDetails.accessLevel > 0 && <GridContainer>

                <GridElementLeft>
                    <LoginP> Logged in as <b>{this.props.userDetails.username}</b></LoginP>
                    <LoginP> Time Logged In : {this.props.userDetails.timeLoggedIn}</LoginP>

                </GridElementLeft>
                <GridElementRight>
                    <Button onClick={this.handleLogoutClick.bind(this)} style={{margin: '12px'}}>Log out</Button>

                </GridElementRight>
            </GridContainer>}
            {this.props.userDetails.accessLevel === 0 && <LoginAbsolute>
                <p>Please Log In</p>
                <UserNameInput onEnterUserName={this.handleLoginClick.bind(this)}></UserNameInput>
            </LoginAbsolute>}
        </>)
    }
}

export default Account;
