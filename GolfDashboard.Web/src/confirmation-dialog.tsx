import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

interface ConfirmationDialogProps {
    target: string,
}

interface ConfirmationDialogState {
    content: string,
}

interface ConfirmationDialogModel {
    title: string,
    content: string,
    width: string,
    primaryButtonText: string,
    primaryButtonClick: () => void
}

export class ConfirmationDialog extends React.Component<ConfirmationDialogProps, ConfirmationDialogState> {

    private _dialog: DialogComponent | null;

    constructor(props: ConfirmationDialogProps) {
        
        super(props);

        this.state = { content: "", };
        this._dialog = null;

    }

    show(params: ConfirmationDialogModel) {

        this.setState({ content: params.content, });

        if(this._dialog != null) {

            this._dialog.header = params.title;
            this._dialog.width = params.width;
            this._dialog.buttons = [{
                buttonModel: {
                    content: params.primaryButtonText,
                    isPrimary: true
                },
                click: () => { 
                    this._dialog?.hide(); 
                    params.primaryButtonClick(); 
                }
            }, {
                buttonModel: {
                    content: "Cancel",
                    isPrimary: false,
                },
                click: () => this._dialog?.hide()
            }];

            this._dialog.show();
        }
    }

    render() {
        return (
            <DialogComponent target={this.props.target}
                             visible={false} 
                             isModal={true}
                             closeOnEscape={true} 
                             animationSettings={{ effect: "FadeZoom", delay: 0}}
                             position={{ X: 'center', Y: 'top' }}
                             ref={dialog => this._dialog = dialog}>
                <p>
                    {this.state.content}
                </p>
            </DialogComponent>
        );
    }
}