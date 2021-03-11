import React, { ChangeEvent } from 'react';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { MultiSelectComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';

import { APIService } from '../services/apiService';

import '../css/components/notes-modal.css';
import { Tag } from '../models/tag';

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

    private _notesDialog: DialogComponent | null = null;
    private _notesDialogButtons: Array<ButtonPropsModel>;
    private _animationSettings: AnimationSettingsModel;
    private _rteEditor: RichTextEditorComponent | null;
    private _apiService: APIService;

    private _tagsDataSource: { [key: string]: Object }[] = [];
    private _tagFields: object;

    constructor(props: NotesProps) {

        super(props);
    
        this._rteEditor = null;
        this._apiService = new APIService();
        this._tagsDataSource = [];
        this._tagFields = {
            text: "text",
            value: "id"
        };
        
        this._notesDialogButtons = [{
            buttonModel: {
                content: "Save",
                isPrimary: false,
                cssClass: "notes-save-button"
            },
            click: () => this.saveNewNote()
        }];

        this._animationSettings = {
            effect: "FadeZoom",
            delay: 0
        };

        this.state = {
            title: ""
        };
   }

    async componentDidMount() {

        try
        {
            let tags = await this._apiService.getTags();

            tags.forEach(t => {
                this._tagsDataSource.push({
                    text: t.text,
                    id: t.id
                });
            });
        }
        catch
        { }
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
                    <input id="noteTitle" type="text" placeholder="Title" className="mb-2" value={this.state.title} onChange={(e) => this.onTitleChanged(e)} />
                    <div className="d-flex mt-1 mb-2 w-50">
                        <span className="align-self-center mr-2">Tags:</span>
                        <MultiSelectComponent dataSource={this._tagsDataSource} 
                                              fields={this._tagFields} 
                                              allowCustomValue={true}
                                              mode="Box"
                                              placeholder="No Tags Selected" />
                    </div>
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

        var tags: Tag[] = [];


        var noteContents = {
            title: this.state.title,
            content: this._rteEditor!.getHtml(),
            tags: tags
        };

        try 
        {
            if(await this._apiService.saveNewNote(noteContents)) {

                this._rteEditor!.value = "";
                this.setState({ title: "" });

                this.props.onSaveCallback(true);
                this._notesDialog?.hide();
            }
        }
        catch
        {
            this.props.onSaveCallback(false);
        }
    }

    /*enableDisableSaveButton(): void {

        let canSave = this.state.title != null 
                      && this.state.title.trim().length > 0 
                      && this._rteEditor!.value.length > 0;

        this._notesDialogButtons[0].buttonModel!.disabled = !canSave;
        this._notesDialog!.buttons = this._notesDialogButtons;
        this._notesDialog!.dataBind();
    }*/
}
