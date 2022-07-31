import React from "react";

const WarningNoPosts = props => {

    if (props.posts?.length === 0) {
        return <div>
            <p>Come back tomorrow!</p>
        </div>
    }

    return null;
}
export default WarningNoPosts;
