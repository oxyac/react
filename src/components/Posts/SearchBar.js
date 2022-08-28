import {InputText} from "primereact/inputtext";
import {useEffect, useState} from "react";


export const SearchBar = (props) => {

    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(searchTerm);
            props.handleSearch(searchTerm);
        }, 1000)

        // cleans up effects from the previous render
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    return (<InputText autoFocus value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                       placeholder="Search"/>)
}
