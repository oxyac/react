import React, {useRef, useState} from 'react';
import WarningNoPosts from "./WarningNoPosts";
import WritePost from "./WritePost";
// import faker from 'faker';
import {Button} from 'primereact/button';
import {config, deleteData, getData, postData} from "../../util/util";
import {Toast} from "primereact/toast";
import styled, {createGlobalStyle, keyframes, css} from "styled-components";
import {SearchBar} from "./SearchBar";
import ReactPaginate from 'react-paginate';
import paginate from '../UI/pagination/pagination.module.css';

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


    const [paramOptions, setParamOptions] = useState({
        page: 1, filter: '', perPage: 15
    });

    const [pageOptions, setPageOptions] = useState({
        total: 0, pageCount: 1, currentPage: 1,
    });

    React.useEffect(() => {
        getPostList();
    }, []);

    React.useEffect(() => {
        //call function when something change in state
        getPostList();
    }, [paramOptions]) //dependency added


    const toast = useRef(null);

    const getPostList = () => {
        getData('posts', paramOptions)
            .then((json) => {
                fillData(json);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const fillData = (json) => {
        setPostList(json.data.items);
        setPageOptions({
            total: json.data.total,
            pageCount: Math.ceil(json.data.total / paramOptions.perPage),
            currentPage: json.data.page,
        });
    }

    if (props.access < 1) {

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
        postData('posts', post)
            .then((data) => {
                toast.current.show({severity: 'success', summary: 'Success', detail: `${action} action successful`});

                if (action === 'Add') {
                    setPostList((prevState) => [data.data.items, ...prevState]);
                } else if (action === 'Edit') {
                    let idx = postList.findIndex(p => p.id === post.id);
                    const newPostList = [...postList];
                    newPostList[idx] = data.data.items;
                    setPostList(newPostList);
                } else {
                    console.log('error');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function deletePost(postDelete) {
        deleteData('posts', postDelete.id)
            .then((json) => {
                if (json.data.items !== true) {
                    toast.current.show({severity: 'error', summary: 'Error', detail: `Entity not deleted`});
                    return;
                }
                toast.current.show({severity: 'success', summary: 'Error', detail: `success`});
                setPostList((prev) => {
                    return prev.filter(post => post !== postDelete);
                });
                setIsLoading(false);
            })
            .catch((error) => console.log(error))
    }

    const handleSearchAction = (value) => {

        setParamOptions({
            ...paramOptions, filter: value
        })

    }

    const handlePageClick = (e) => {

        setParamOptions({
            ...paramOptions, page: e.selected + 1
        })

    };

    return (<>
        <Toast ref={toast} position="top-right" style={{position: "fixed"}}/>

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
            </div>}

            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={paginate.breakMe}
                pageCount={pageOptions.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={paginate.pagination}
                subContainerClassName={"pages pagination"}
                activeClassName={paginate.active}/>
        </Container>}

        {(action !== '') && <WritePost savePost={handleSaveAction} access={props.access} action={action}
                                       post={editingPost}
                                       setAction={setAction}
                                       cancelSubmission={cancelSubmissionHandler}></WritePost>}

    </>);

};


export default PostList;
