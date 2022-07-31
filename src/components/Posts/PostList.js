import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import WarningNoPosts from "./WarningNoPosts";
import WritePost from "./WritePost";
import faker from 'faker';
import {Button} from 'primereact/button';
import {config, postData} from "../../util/util";
import {Toast} from "primereact/toast";

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
        const url = config.apiUrl + '?method=getAll';
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setPostList(json.data.sort((a, b) => a.id - b.id));
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

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
                    setPostList((prevState) => [...prevState, post].sort((a, b) => a.id - b.id));
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
        setPostList((prev) => {
            return prev.filter(post => post !== postDelete);
        });
    }

    return (<div>
        <Toast ref={toast} position="top-right"/>
        <div>

            {isLoading === true ? <h2> One Second ... </h2> : <div className="post-content">
                <WarningNoPosts posts={postList}></WarningNoPosts>
                <div>
                    {(action === '' || postList.length === 0) && <div style={{}}>
                        <Button onClick={toggleAddPost}>Add Post</Button>
                    </div>}
                    {(action !== '') && <WritePost savePost={handleSaveAction} access={props.access} action={action}
                                                   post={editingPost}
                                                   setAction={setAction}
                                                   cancelSubmission={cancelSubmissionHandler}></WritePost>}
                </div>
                {postList?.length > 0 && <ul>
                    {postList.map((post) => (<div key={post.id} className="post-list">
                        <li className="post-list-el">
                            <h3
                                style={{wordBreak: "break-word"}}
                            >{post.id} | {post.title}</h3>
                            <p
                                style={{wordBreak: "break-word"}}>
                                {post.body}
                            </p>
                        </li>

                        {action === '' &&
                            <button style={{marginRight: 0}} onClick={() => toggleEditPost(post)}>Edit</button>}
                        {action === '' && <button style={{marginLeft: 0}} onClick={() => deletePost(post)}>X</button>}
                    </div>))}
                </ul>}</div>}


        </div>
    </div>);

};


export default PostList;
