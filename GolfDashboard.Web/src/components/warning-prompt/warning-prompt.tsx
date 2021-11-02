import Popup from 'devextreme-react/popup';
import Button from 'devextreme-react/button'

import WarningIcon from '../../images/warning.svg';

export interface WarningPromptProps {
    title: string;
    message: string;
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

export function WarningPrompt(props: WarningPromptProps) {

    const renderTitle = () => {
        return (
            <div className="flex pt-2 pb-2">
                <img src={WarningIcon} alt="Warning" width="20" height="20" />
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
                    <Button text="OK" onClick={props.onOk} type="normal" stylingMode="outlined" />
                    <Button text="Cancel" onClick={() => props.onCancel()} type="default" />
                </div>
            </div>
        </Popup>
    );
}