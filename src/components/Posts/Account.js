import UserNameInput from "./UserNameInput";
import React from "react";
import PostList from "./PostList";
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
            isLoggedIn: false,
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
        // this.props.setAccess(2);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    render() {
        return (
            <div>{this.state.isLoggedIn &&
                <div>
                    <p> Logged in as {this.state.username}</p>
                    <p> Time Logged In : {this.state.timeLoggedIn}</p>
                    <button onClick={this.handleLogoutClick.bind(this)}>Log out</button>
                </div>}
                {!this.state.isLoggedIn && <div>
                    <p>Please Log In</p>
                    <UserNameInput onEnterUserName={this.handleLoginClick.bind(this)}></UserNameInput>
                </div>
                }
            </div>
        )
    }
}

export default Account;
