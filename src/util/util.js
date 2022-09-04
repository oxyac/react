export const isEmpty = (object) => {
    return !Object.values(object).some(x => x !== null && x !== '');
}

const apiUrl = 'http://127.0.0.1:90/crud/public/api.php';
const laravelApiUrl = 'http://127.0.0.1:8000/api/';

export const config = {
    api: laravelApiUrl,
}

const buildParamQuery = (options) => {

    let string = '?';
    for(let opt in options){
        string += `${opt}=${options[opt]}&`;
    }
    console.log(string);
    return string;
}

export async function getData(resource, options = null){

    const url = config.api + resource + buildParamQuery(options);
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
            'Access-Control-Request-Headers':'*',
            'Accept':'application/json'
        },
    })
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function postData(resource, data){
    const response = await fetch(config.api + `${resource}/${data?.id != null ? data?.id : ''}`, {
        method: [data?.id != null ? 'PUT' : 'POST'], // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function deleteData(resource, id){

    const url = config.api + `${resource}/${id}`;
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
            'Access-Control-Request-Headers':'*',
            'Accept':'application/json'
        },
    })
    return response.json(); // parses JSON response into native JavaScript objects
}

