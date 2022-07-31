import React from "react";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {isEmpty} from "../../util/util";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import { Toast } from 'primereact/toast';

const WritePost = props => {

    const [modalOpen, setModalState] = useState(true);
    const [formPost, setFormPost] = useState(props.post);
    const [isValid, setIsValid] = useState(true);

    if (props.access <= 1) {
        console.log(['props.access'])
        return null;
    }

    const handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormPost({...formPost, [name]: value});
    }

    const formSubmitHandler = event => {
        event.preventDefault();
        if (isEmpty(formPost)) {
            setIsValid(false);
            return;
        }
        console.log(formPost);
        props.savePost(formPost);
        props.setAction('');
        setFormPost(null);
        setModalState(false);
    };

    function cancelSubmission() {
        props.cancelSubmission();
        setModalState(false);
    }

    return (<div id="myModal" className="modal" style={{
        display: modalOpen ? "block" : "none"
    }}>

        <form onSubmit={formSubmitHandler}>
            <div className="modal-content">
                <div className="input-modal_action">
                    <h4>{props.action} post</h4>
                </div>

                <h5>Title:</h5>
                <InputTextarea
                    className="input-modal input-modal_title"
                    name="title"
                    onChange={handleInputChange}
                    value={formPost.title}
                    maxLength={100}
                    rows={5}
                    cols={30}
                    autoResize={true}/>
                <h5>Content:</h5>
                <InputTextarea
                    className="input-modal input-modal_content"
                    name="body"
                    onChange={handleInputChange}
                    value={formPost.body}
                    maxLength={450}
                    rows={5}
                    cols={30}
                    autoResize={true}/>
                <Button type="submit"
                        className="btn-modal"
                        label={props.action}
                        icon="pi pi-check"
                        iconPos="left"
                        loadingIcon="pi pi-spinner pi-spin"
                        // loading={loading}
                        // disabled="false"
                ></Button>
                <Button type="button" className="btn-modal" onClick={cancelSubmission} label="Cancel"></Button>

            </div>
        </form>

    </div>)

}

export default WritePost
