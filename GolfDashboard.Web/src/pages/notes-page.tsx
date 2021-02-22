import React, { ChangeEvent } from 'react';
import { Route } from 'react-router-dom';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { APIService } from '../services/apiService';

import '../css/pages/notes-page.css';

interface NotesProps { };

interface NotesState {
    title: string;
}

export class NotesPage extends React.Component<NotesProps, NotesState> {

    private _rteEditor: RichTextEditorComponent | null;
    private _apiService: APIService;

    constructor(props: NotesProps) {

        super(props);
    
        this._rteEditor = null;
        this._apiService = new APIService();
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
                <Route render={({ history}) => (
                    <button className="btn btn-primary btn-sm align-self-end font-size-small mt-2" 
                            onClick={(e) => this.saveNewNote(history)}
                            disabled={!this.canSave()}>Save</button>
                )} />
            </div>
        );
    }

    onTitleChanged(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            title: event.target.value,
        });
    }

    saveNewNote(history: any) {

        var noteContents = {
            title: this.state.title,
            content: this._rteEditor!.getHtml()
        };

        this._apiService.saveNewNote(noteContents)
            .then(success => {
                history.push("/");
            });
    }

    canSave(): boolean {
        return this.state.title.trim().length > 0;
    }
}
