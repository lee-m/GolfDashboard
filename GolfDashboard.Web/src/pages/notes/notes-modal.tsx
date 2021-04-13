import React, { ChangeEvent } from 'react';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

import { Note, Tag } from '../../models';

import './notes-modal.css';

interface OnSaveCallback { 
    (note: Note): void 
}

interface OnCloseCallback {
    (): void
}

interface NotesModalProps { 
    target: string;
    visible: boolean;
    selectedNote: Note | null;
    tags: Array<Tag>;
    onSave: OnSaveCallback;
    onClose: OnCloseCallback;
};

interface NotesModalState {
    title: string;
    titleErrorCSSClass: string;
    contentErrorCSSClass: string;
}

export class NotesModal extends React.Component<NotesModalProps, NotesModalState> {

    private _notesDialog: DialogComponent | null = null;
    private _notesDialogButtons: Array<ButtonPropsModel>;
    private _animationSettings: AnimationSettingsModel;
    private _rteEditor: RichTextEditorComponent | null;

    private _tagFields: object;
    private _tagEditor: MultiSelectComponent | null;

    constructor(props: NotesModalProps) {

        super(props);
    
        this._rteEditor = null;
        this._tagEditor = null;
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
            click: () => this.props.onClose()
        }, {
            buttonModel: {
                content: "Save",
                isPrimary: false,
                cssClass: "notes-save-button"
            },
            click: () => this.saveNewNote()
        }]

        this._animationSettings = {
            effect: "FadeZoom"
        };

        this.state = {
            title: "",
            titleErrorCSSClass: "",
            contentErrorCSSClass: ""
        };
   }

    componentDidUpdate(prevProps: NotesModalProps, prevState: NotesModalState) {

        if(this.props.visible === prevProps.visible) {
            return;
        }

        this.updateTagsDataSource();

        this._rteEditor!.value = this.props.selectedNote?.content ?? "";
        this._tagEditor!.value = this.props.selectedNote?.tags ?? [];

        this.setState({ 
            title: this.props.selectedNote?.title ?? "",
            titleErrorCSSClass: "",
            contentErrorCSSClass: ""
        });
    }

    render() {
        return (
            <DialogComponent width='60%' 
                             height='60%' 
                             target={this.props.target}
                             visible={this.props.visible} 
                             isModal={true}
                             allowDragging={true}
                             header='Add New Note'
                             closeOnEscape={false} 
                             animationSettings={this._animationSettings}
                             position={{ X: 'center', Y: 'center' }}
                             buttons={this._notesDialogButtons} 
                             beforeClose={() => this.beforeDialogClose()}
                             ref={dialog => this._notesDialog = dialog}>
                <div className="flex flex-col h-full">
                    <input id="noteTitle" 
                           type="text" 
                           placeholder="Title" 
                           className={"mb-2 e-input " + this.state.titleErrorCSSClass} 
                           value={this.state.title} 
                           onChange={(e) => this.onTitleChanged(e)} />
                    <div className="flex mt-1 mb-2 w-100">
                        <span className="self-center mr-2">Tags:</span>
                        <MultiSelectComponent ref={e => this._tagEditor = e}
                                              fields={this._tagFields} 
                                              allowCustomValue={true}
                                              mode="Box"
                                              placeholder="No Tags Selected" />
                    </div>
                    <div className={"flex flex-grow " + this.state.contentErrorCSSClass}>
                        <RichTextEditorComponent ref={rteEditor => this._rteEditor = rteEditor} value={this.props.selectedNote?.content} >
                            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
            </DialogComponent>
        );
    }

    private updateTagsDataSource() {

        let tagsDataSource: { text: string; id: number; }[] = [];

        this.props.tags.forEach(t => {
            tagsDataSource.push({
                text: t.text,
                id: t.id
            });
        });

        this._tagEditor!.dataSource = tagsDataSource;
    }

    private beforeDialogClose() {

        if(this._notesDialog) {

            let overlay = this._notesDialog.element!.parentElement!.querySelector(".e-dlg-overlay")!;
            overlay.classList.add("e-fade");
        }
    }

    private onTitleChanged(event: ChangeEvent<HTMLInputElement>): void {

        this.setState({
            title: event.target.value,
        });
    }

    private saveNewNote() {

        //Check something has been entered before allowing the note to be saved
        if(!this.validate()) {
            return;
        }

        var noteContents = {
            id: this.props.selectedNote?.id,
            title: this.state.title,
            content: this._rteEditor!.getHtml(),
            tags: this.getSelectedTags()
        };

        this.props.onSave(noteContents);
    }

    private validate(): boolean {

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

    private getSelectedTags(): string[] {

        var tags: string[] = [];

        if(!this._tagEditor) {
            return tags;
        }

        if(this._tagEditor.value != null) {

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
