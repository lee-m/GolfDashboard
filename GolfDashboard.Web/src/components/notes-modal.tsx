import React, { ChangeEvent } from 'react';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { APIService } from '../services/apiService';

import '../css/components/notes-modal.css';

interface OnSaveCallback { 
    (success: boolean): void 
}

interface NotesProps { 
    target: string;
    onSaveCallback: OnSaveCallback;
};

interface NotesState {
    title: string;
}


export class NotesModal extends React.Component<NotesProps, NotesState> {

    private _notesDialog: DialogComponent | null;
    private _notesDialogButtons: Array<ButtonPropsModel>;
    private _animationSettings: AnimationSettingsModel;
    private _rteEditor: RichTextEditorComponent | null;
    private _apiService: APIService;

    constructor(props: NotesProps) {

        super(props);
    
        this._notesDialog = null;
        this._rteEditor = null;
        
        this._notesDialogButtons = [{
            buttonModel: {
                content: "Save",
                isPrimary: true,
                cssClass: "e-flat"

            },
            click: () => this.saveNewNote()
        }];
        this._animationSettings = {
            effect: "FadeZoom",
            delay: 0
        };
        this._apiService = new APIService();
        this.state = {
            title: "",
        };
        
    }

    show() {
        this._notesDialog?.show();
    }

    render() {
        return (
            <DialogComponent width='60%' 
                             height='60%' 
                             target={this.props.target}
                             visible={false} 
                             showCloseIcon={true} 
                             isModal={true}
                             header='Add New Note'
                             closeOnEscape={false} 
                             animationSettings={this._animationSettings}
                             position={{ X: 'center', Y: 'center' }}
                             buttons={this._notesDialogButtons} 
                             ref={dialog => this._notesDialog = dialog}>
                    <div className="notes-main-content h-100">
                        <RichTextEditorComponent ref={rteEditor => this._rteEditor = rteEditor}>
                            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                        </RichTextEditorComponent>
                    </div>
            </DialogComponent>
        );
    }

    onTitleChanged(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            title: event.target.value,
        });
    }

    async saveNewNote() {

        this._notesDialog?.hide();

        var noteContents = {
            title: this.state.title,
            content: this._rteEditor!.getHtml()
        };

        try 
        {
            let result = await this._apiService.saveNewNote(noteContents);
            this.props.onSaveCallback(result);
        }
        catch
        {
            this.props.onSaveCallback(false);
        }
    }

    canSave(): boolean {
        return this.state.title.trim().length > 0;
    }
}
