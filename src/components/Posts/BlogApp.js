import React from "react";
import PostList from "./PostList";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import {userContext} from "./context/context";


export const BlogApp = () => {

    return (<>

        <userContext.Consumer>
            {value => <PostList access={value.accessLevel}>
            </PostList>}
        </userContext.Consumer>


    </>)
}

