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

    const renderTitle = () => {
        return (
            <div className="flex pt-2 pb-2">
                <i className="bi bi-exclamation-circle-fill text-accent-red text-lg text-bold"></i>
                <span className="text-lg font-semibold pl-2">{props.title}</span>
            </div>
        );
    }

    return (
        <Popup showTitle={true}
            visible={props.visible}
            showCloseButton={false}
            height="auto"
            width="auto"
            dragEnabled={false}
            titleRender={renderTitle}
            onHidden={() => showSpinner(false)}>
            <div className="flex flex-col pl-2 pr-2">
                <span>{props.message}</span>
                <div className="self-end mt-4 space-x-2 pt-3">
                    <Button text="Delete" icon={SpinnerLogo} onClick={deleteClick} stylingMode="contained" type="danger" elementAttr={{ class: "button-sm delete-btn text-semibold " + (spinnerVisible ? "saving" : "") }} />
                    <Button text="Cancel" onClick={() => props.onCancel()} stylingMode="outlined" type="normal" elementAttr={{ class: "button-sm" }} />
                </div>
            </div>
        </Popup>
    );
}