import React, {useState} from "react";
import PostList from "./PostList";
import Account from "./Account";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';


export const BlogApp = props => {

    const [accessLevel, setAccessLevel] = useState(0);

    const handleAccess = (level) => {
        setAccessLevel(level);
    }


    return (<div>
        <Account setAccess={handleAccess}></Account>
        {accessLevel >= 1 && <div>
            <PostList access={accessLevel}>
            </PostList>
        </div>}

    </div>)
}

