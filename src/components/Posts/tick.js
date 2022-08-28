import React, {useEffect, useState} from 'react';


class Tick extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID =  setInterval(this.setState({date: new Date()}), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.setState({date: new Date()})
    };


    render() {
        return (
            <div>
                <h2> Local Time : {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }

}


export default Tick;
