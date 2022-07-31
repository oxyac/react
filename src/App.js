import React from 'react';
import './App.css';
import {BlogApp} from "./components/Posts/BlogApp";




const App = () => {

    return (
        <div>

            <BlogApp posts={[]}>
            </BlogApp>
        </div>
    );
};

export default App;
