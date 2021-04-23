import Popup  from 'devextreme-react/popup';
import Button from 'devextreme-react/button'

export interface DeletePromptProps {
    title: string;
    message: string;
    visible: boolean;
    onDelete: () => void;
    onCancel: () => void;
}

export function DeletePrompt(props: DeletePromptProps) {

    return (
        <Popup showTitle={true}
                visible={props.visible}
                showCloseButton={false}
                height="auto"
                width="auto"
                title={props.title}>
            <div className="flex flex-col">
                <span>{props.message}</span>
                <div className="self-end mt-4 space-x-2">
                    <Button text="Delete" onClick={() => props.onDelete()} stylingMode="contained" type="danger" elementAttr={{ class: "button-sm" }} />
                    <Button text="Cancel" onClick={() => props.onCancel()} stylingMode="outlined"  type="normal" elementAttr={{ class: "button-sm" }} />
                </div>
            </div>
        </Popup>
    );
}