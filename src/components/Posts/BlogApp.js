import React from "react";
import PostList from "./PostList";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import {accessLevelContext} from "./context/context";


export const BlogApp = () => {

    return (<div>

        <accessLevelContext.Consumer>
            {value => <PostList access={value}>
            </PostList>}
        </accessLevelContext.Consumer>


    </div>)
}

