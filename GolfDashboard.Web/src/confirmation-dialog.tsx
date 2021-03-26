import * as React from 'react';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';

interface ConfirmationDialogProps<TParam> {
    title: string,
    content: string,
    width: string,
    target: string,
    primaryButtonText: string,
    primaryButtonClick: (params?: TParam) => void
}

interface ConfirmationDialogState<TParam> {
    customParams?: TParam
}

export class ConfirmationDialog<TParam> extends React.Component<ConfirmationDialogProps<TParam>, ConfirmationDialogState<TParam>> {

    private _dialogButtons: Array<ButtonPropsModel>;
    private _dialog: DialogComponent | null;

    constructor(props: ConfirmationDialogProps<TParam>) {
        
        super(props);

        this.state = {};
        this._dialog = null;
        this._dialogButtons = [{
            buttonModel: {
                content: this.props.primaryButtonText,
                isPrimary: true
            },
            click: () => { 
                this._dialog?.hide(); 
                this.props.primaryButtonClick(this.state.customParams); 
            }
        }, {
            buttonModel: {
                content: "Cancel",
                isPrimary: false,
            },
            click: () => this._dialog?.hide()
        }]

    }

    show(params?: TParam) {

        this.setState({ customParams: params });
        this._dialog?.show();
    }

    render() {
        return (
            <DialogComponent target={this.props.target}
                             width={this.props.width}
                             visible={false} 
                             isModal={true}
                             header={this.props.title}
                             closeOnEscape={true} 
                             animationSettings={{ effect: "FadeZoom", delay: 0}}
                             position={{ X: 'center', Y: 'top' }}
                             ref={dialog => this._dialog = dialog}
                             buttons={this._dialogButtons}>
                <p>
                    {this.props.content}
                </p>
            </DialogComponent>
        );
    }
}