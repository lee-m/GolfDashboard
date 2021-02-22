import React, { ChangeEvent } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import '../css/pages/notes-page.css';

interface NotesProps { };

interface NotesState {
    title: string;
}

export class NotesPage extends React.Component<NotesProps, NotesState> {

    private _rteEditor: RichTextEditorComponent | null;

    constructor(props: NotesProps) {
        super(props);
    
        this._rteEditor = null;
        this.state = {
            title: "",
        };
    }

    render() {
        return (
            <div className="notes-main-content h-100 p-3">
                <input id="noteTitle" 
                       type="text" 
                       placeholder="Title" 
                       className="mb-2" 
                       value={this.state.title}
                       onChange={(e) => this.onTitleChanged(e)} />
                <RichTextEditorComponent ref={rteEditor => this._rteEditor = rteEditor}>
                    <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                </RichTextEditorComponent>
                <button className="btn btn-primary btn-sm align-self-end font-size-small mt-2" 
                        onClick={(e) => this.saveNewNote()}
                        disabled={!this.canSave()}>Save</button>
            </div>
        );
    }

    onTitleChanged(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            title: event.target.value,
        });
    }

    saveNewNote(): void {

        var noteContents = {
            title: this.state.title,
            content: this._rteEditor!.getHtml()
        };

        alert(JSON.stringify(noteContents));
    }

    canSave(): boolean {
        return this.state.title.trim().length > 0;
    }
}
