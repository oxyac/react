import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import {BlogApp} from "./components/Posts/BlogApp";
import {A, NavBar, NavBarLink, NavBarLinkRight, StyledLink} from "./components/UI/StyledComponents";
import Account from "./components/Posts/Account";
import {Example} from "./components/Posts/effects";
import {userContext} from "./components/Posts/context/context";


const App = () => {

    const [userDetails, setUserDetails] = useState({
        username: '',
        accessLevel: 0,
        timeLoggedIn: 0
    });

    useEffect(() => {
        const userDetailsCached = localStorage.getItem('userDetails');

        console.log(userDetailsCached);
        if(userDetailsCached){
            setUserDetails(JSON.parse(userDetailsCached));

        }

    }, [])

    const handleUserDetails = (userDetails) => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        setUserDetails(userDetails);
    }

    return (<div>

        <NavBar>
            <NavBarLink>
                <StyledLink to="/"><i className="pi pi-home" style={{'fontSize': '2em'}}></i></StyledLink>
            </NavBarLink>
            <NavBarLink>
                <StyledLink to="/use-effect"><i className="pi pi-home" style={{'fontSize': '2em'}}></i></StyledLink>
            </NavBarLink>

            <NavBarLinkRight>
                <Account
                    setUserDetails={handleUserDetails}
                    userDetails={userDetails}></Account>
            </NavBarLinkRight>
        </NavBar>
        <br/>

        <userContext.Provider value={userDetails}>
            <Routes>
                <Route path="/" element={<BlogApp/>}/>
                <Route path="use-effect" element={<Example/>}/>
            </Routes>
        </userContext.Provider>
        </div>
    );
};

export default App;
