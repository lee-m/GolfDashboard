import React, { ChangeEvent } from 'react';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { NotesService } from '../../services';

import './notes-modal.css';

interface OnSaveCallback { 
    (success: boolean): void 
}

interface NotesProps { 
    target: string;
    onSaveCallback: OnSaveCallback;
};

interface NotesState {
    title: string;
    titleErrorCSSClass: string;
    contentErrorCSSClass: string;
}

export class NotesModal extends React.Component<NotesProps, NotesState> {

    private _notesDialog: DialogComponent | null = null;
    private _notesDialogButtons: Array<ButtonPropsModel>;
    private _animationSettings: AnimationSettingsModel;
    private _rteEditor: RichTextEditorComponent | null;
    private _notesService: NotesService;

    private _tagsDataSource: { [key: string]: Object }[] = [];
    private _tagFields: object;
    private _tagEditor: MultiSelectComponent | null;

    constructor(props: NotesProps) {

        super(props);
    
        this._rteEditor = null;
        this._tagEditor = null;
        this._notesService = new NotesService();
        this._tagsDataSource = [];
        this._tagFields = {
            text: "text",
            value: "id"
        };
        
        this._notesDialogButtons = [{
            buttonModel: {
                content: "Cancel",
                isPrimary: false,
                cssClass: "e-primary font-weight-bold"
            },
            click: () => this._notesDialog?.hide()
        }, {
            buttonModel: {
                content: "Save",
                isPrimary: false,
                cssClass: "notes-save-button"
            },
            click: () => this.saveNewNote()
        }]

        this._animationSettings = {
            effect: "FadeZoom",
            delay: 0
        };

        this.state = {
            title: "",
            titleErrorCSSClass: "",
            contentErrorCSSClass: ""
        };
   }

    async componentDidMount() {

        try
        {
            let tags = await this._notesService.getTags();

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

        this._rteEditor!.value = "";
        this._tagEditor!.value = [];
        this.setState({ title: "" });

        this._notesDialog?.show();
    }

    beforeDialogClose() {

        debugger;
        let dialogOverlay = document.querySelector(".e-dlg-overlay");
        
        if(dialogOverlay) {
            dialogOverlay.classList.add("e-fade");
        }
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
                             beforeClose={() => this.beforeDialogClose()}
                             animationSettings={this._animationSettings}
                             position={{ X: 'center', Y: 'center' }}
                             buttons={this._notesDialogButtons} 
                             ref={dialog => this._notesDialog = dialog}>
                <div className="notes-main-content h-100">
                    <input id="noteTitle" type="text" placeholder="Title" className={"mb-2 e-input " + this.state.titleErrorCSSClass} value={this.state.title} onChange={(e) => this.onTitleChanged(e)} />
                    <div className="d-flex mt-1 mb-2 w-100">
                        <span className="align-self-center mr-2">Tags:</span>
                        <MultiSelectComponent ref={e => this._tagEditor = e}
                                              dataSource={this._tagsDataSource} 
                                              fields={this._tagFields} 
                                              allowCustomValue={true}
                                              mode="Box"
                                              placeholder="No Tags Selected" />
                    </div>
                    <div className={"d-flex flex-grow-1 " + this.state.contentErrorCSSClass}>
                        <RichTextEditorComponent ref={rteEditor => this._rteEditor = rteEditor} >
                            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                        </RichTextEditorComponent>
                    </div>
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

        //Check something has been entered before allowing the note to be saved
        if(!this.validate()) {
            return;
        }

        var noteContents = {
            title: this.state.title,
            content: this._rteEditor!.getHtml(),
            tags: this.getSelectedTags()
        };

        try 
        {
            if(await this._notesService.saveNewNote(noteContents)) {
                this.props.onSaveCallback(true);
                this._notesDialog?.hide();
            }
        }
        catch
        {
            this.props.onSaveCallback(false);
        }
    }

    validate(): boolean {

        var titleMissing = !this.state.title;
        var contentMissing = (this._rteEditor!.value?.length ?? 0) === 0;

        if(titleMissing || contentMissing) {

            this.setState({
                titleErrorCSSClass: titleMissing ? "e-error" : "",
                contentErrorCSSClass: contentMissing ? "notes-error-border" : ""
            });

            return false;
        }

        return true;
    }

    getSelectedTags(): string[] {

        var tags: string[] = [];

        if(this._tagEditor?.value != null) {

            this._tagEditor.value.forEach((tagID: any) => {

                if(!tagID) {
                    return;
                }

                var tag = this._tagEditor?.getDataByValue(tagID) as { id: number, text: string};

                if(tag) {
                    tags.push(tag.text);
                }

            });

        }

        return tags;
    }
}
