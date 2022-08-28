import React, {useState} from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import {BlogApp} from "./components/Posts/BlogApp";
import {A, NavBar, NavBarLink, NavBarLinkRight, StyledLink} from "./components/UI/StyledComponents";
import Account from "./components/Posts/Account";
import {Example} from "./components/Posts/effects";
import {accessLevelContext} from "./components/Posts/context/context";


const App = () => {

    const [accessLevel, setAccessLevel] = useState(0);

    const handleAccess = (level) => {
        setAccessLevel(level);
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
                <Account setAccess={handleAccess}></Account>
            </NavBarLinkRight>
        </NavBar>
        <br/>

        <accessLevelContext.Provider value={accessLevel}>
            <Routes>
                <Route path="/" element={<BlogApp/>}/>
                <Route path="use-effect" element={<Example/>}/>
            </Routes>
        </accessLevelContext.Provider>
        </div>
    );
};

export default App;
