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
            timeLoggedIn: 0,
            isLoggedIn: true,
            username: ''
        };
    }

    handleLoginClick(username, access = 1) {
        this.setState({
                username: username,
                isLoggedIn: true
            },
            this.initiateLogin(access));
    }

    handleLogoutClick() {
        this.setState({
            timeLoggedIn: 0,
            isLoggedIn: false
        })
        this.props.setAccess(0);
        clearInterval(this.timerID);
    }

    initiateLogin(access) {
        console.log(access);

        this.props.setAccess(access);
        if(!this.timerID){
            this.timerID = setInterval(() => {
                // console.log(this.state.timeLoggedIn);
                this.setState({timeLoggedIn: this.state.timeLoggedIn + 1})
            }, 1000)
        }
    }

    componentDidMount() {
        this.props.setAccess(2);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    render() {
        return (
            <div>{this.state.isLoggedIn &&
                <GridContainer>

                    <GridElementLeft>
                        <LoginP> Logged in as <b>{this.state.username}</b></LoginP>
                        <LoginP> Time Logged In : {this.state.timeLoggedIn}</LoginP>

                    </GridElementLeft>
                    <GridElementRight>
                        <Button onClick={this.handleLogoutClick.bind(this)} style={{margin: '12px'}}>Log out</Button>

                    </GridElementRight>
                </GridContainer>}
                {!this.state.isLoggedIn && <LoginAbsolute>
                    <p>Please Log In</p>
                        <UserNameInput onEnterUserName={this.handleLoginClick.bind(this)}></UserNameInput>
                </LoginAbsolute>
                }
            </div>
        )
    }
}

export default Account;
