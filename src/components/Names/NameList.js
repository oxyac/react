import React from 'react';

const NameList = props => {

    function formatName(props) {
        props.map(person => person.firstName)

    }

    // return <p>{formatName()}</p>;
}


export default NameList;
