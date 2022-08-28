import React, {useRef, useState} from 'react';
import WarningNoPosts from "./WarningNoPosts";
import WritePost from "./WritePost";
// import faker from 'faker';
import {Button} from 'primereact/button';
import {config, postData} from "../../util/util";
import {Toast} from "primereact/toast";
import styled, {createGlobalStyle, keyframes, css} from "styled-components";
import {SearchBar} from "./SearchBar";
import {
    Container, GridContainer, GridElementLeft, GridElementRight, GridElementRightButtons, StyledButton
} from "../UI/StyledComponents";


// const data = new Array(10).fill()
//     .map((value, index) => ({
//         id: index, title: faker.lorem.words(5), body: faker.lorem.sentences(4)
//     }))

const PostList = (props) => {


    const [postList, setPostList] = useState([]);
    const [editingPost, setEditingPost] = useState({})
    const [action, setAction] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const toast = useRef(null);

    React.useEffect(() => {
        console.log(props.access);
        const url = config.apiUrl + '?method=getAll';
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setPostList(json.data.sort((a, b) => a.id - b.id));
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    if(props.access < 1){

        return null;
    }
    function toggleEditPost(post) {
        setEditingPost(post);
        setAction('Edit');
    }

    function toggleAddPost() {
        setEditingPost({})
        setAction('Add');
    }

    const cancelSubmissionHandler = () => {
        setAction('');
    }

    function handleSaveAction(post) {
        // await new Promise(r => setTimeout(r, 2000));


        if (action === 'Add') {
            postData(config.apiUrl, {post, 'method': 'insertOne'})
                .then((data) => {
                    toast.current.show({severity: 'success', summary: 'Success', detail: 'Post Saved'});
                    setPostList((prevState) => [...prevState, data.data].sort((a, b) => a.id - b.id));
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (action === 'Edit') {
            postData(config.apiUrl, {post, 'method': 'editPost'})
                .then((data) => {
                    toast.current.show({severity: 'success', summary: 'Success', detail: 'Post updated'});
                    let idx = postList.findIndex(p => p.id === post.id);
                    const newPostList = [...postList];
                    newPostList[idx] = data.data;
                    setPostList(newPostList);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

        }
    }

    function deletePost(postDelete) {
        fetch(config.apiUrl + `?method=deletePost&postId=` + postDelete.id)
            .then((response) => response.json())
            .then((json) => {
                setPostList((prev) => {
                    return prev.filter(post => post !== postDelete);
                });
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const handleSearchAction = (value) => {
        fetch(config.apiUrl + '?method=getAll&searchTerm=' + value)
            .then((response) => response.json())
            .then((json) => {
                setPostList(json.data.sort((a, b) => a.id - b.id));
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }

    return (<div>
        <div>
            <Toast ref={toast} position="top-right" style={{position: "fixed"}}/>
        </div>
        <div>

            {isLoading === true ? <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i> : <Container>
                <WarningNoPosts posts={postList}></WarningNoPosts>
                <GridContainer>
                    <GridElementLeft>
                        {(action === '' || postList.length === 0) && <div style={{}}>
                            <Button onClick={toggleAddPost} icon="pi pi-plus"></Button>
                        </div>}
                    </GridElementLeft>

                    <GridElementRight>
                        <SearchBar handleSearch={handleSearchAction}></SearchBar>
                    </GridElementRight>
                </GridContainer>
                {postList?.length > 0 && <div>
                    {postList.map((post) => (<GridContainer key={post.id}>
                        <GridElementLeft className="hovered">
                            <h3
                                style={{wordBreak: "break-word"}}
                            >{post.id} | {post.title}</h3>
                            <p
                                style={{wordBreak: "break-word"}}>
                                {post.body}
                            </p>

                        </GridElementLeft>

                        <GridElementRightButtons>
                            <Button icon="pi pi-pencil"
                                    onClick={() => toggleEditPost(post)}></Button>
                            <StyledButton icon="pi pi-times"
                                          onClick={() => deletePost(post)}></StyledButton>
                        </GridElementRightButtons>
                    </GridContainer>))}
                </div>}</Container>}

            <div>

                {(action !== '') && <WritePost savePost={handleSaveAction} access={props.access} action={action}
                                               post={editingPost}
                                               setAction={setAction}
                                               cancelSubmission={cancelSubmissionHandler}></WritePost>}

            </div>


        </div>
    </div>);

};


export default PostList;
