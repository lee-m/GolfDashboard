import { useState } from 'react';
import Popup from 'devextreme-react/popup';
import Button from 'devextreme-react/button'

import SpinnerLogo from '../images/arrow-repeat.svg';
import "./delete-prompt.css";

export interface DeletePromptProps {
    title: string;
    message: string;
    visible: boolean;
    onDelete: () => void;
    onCancel: () => void;
}

export function DeletePrompt(props: DeletePromptProps) {

    const [spinnerVisible, showSpinner] = useState(false);

    const deleteClick = () => {

        showSpinner(true);

        //Wait for the spinner expansion animation to complete before we forward on the 
        //delete event. It's probably better to use the animationend event but that's a lot of
        //faffing for something simple so go with this simply bodge 
        setTimeout(() => props.onDelete(), 300);
    }

    return (
        <Popup showTitle={true}
            visible={props.visible}
            showCloseButton={false}
            height="auto"
            width="auto"
            title={props.title}
            onHidden={() => showSpinner(false)}>
            <div className="flex flex-col">
                <span>{props.message}</span>
                <div className="self-end mt-4 space-x-2">
                    <Button text="Delete" icon={SpinnerLogo} onClick={deleteClick} stylingMode="contained" type="danger" elementAttr={{ class: "button-sm delete-btn " + (spinnerVisible ? "saving" : "") }} />
                    <Button text="Cancel" onClick={() => props.onCancel()} stylingMode="outlined" type="normal" elementAttr={{ class: "button-sm" }} />
                </div>
            </div>
        </Popup>
    );
}