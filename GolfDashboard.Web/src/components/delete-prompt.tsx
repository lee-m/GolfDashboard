import Popup from 'devextreme-react/popup';
import Button from 'devextreme-react/button'
import { AnimatedButton } from './animated-button';

export interface DeletePromptProps {
    title: string;
    message: string;
    visible: boolean;
    onDelete: () => Promise<void>;
    onCancel: () => void;
}

export function DeletePrompt(props: DeletePromptProps) {

    const deleteClick = async () => {

        //Wait for the spinner expansion animation to complete before we forward on the 
        //delete event. It's probably better to use the animationend event but that's a lot of
        //faffing for something simple so go with this simply bodge 
        return new Promise<void>((resolve, reject) => {

            setTimeout(async () => {
                await props.onDelete();
                resolve();
            }, 300);

        })
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
            titleRender={renderTitle}>
            <div className="flex flex-col pl-2 pr-2">
                <span>{props.message}</span>
                <div className="self-end mt-4 space-x-2 pt-3">
                    <AnimatedButton text="Delete" onClick={deleteClick} type="danger" />
                    <Button text="Cancel" onClick={() => props.onCancel()} stylingMode="outlined" type="normal" elementAttr={{ class: "button-sm" }} />
                </div>
            </div>
        </Popup>
    );
}