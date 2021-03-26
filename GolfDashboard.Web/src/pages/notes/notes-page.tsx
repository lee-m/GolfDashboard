import * as React from 'react';
import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { IconButton } from '../../icon-button';

import { Note } from '../../models/note';
import { NotesService } from '../../services';

import "./notes-page.css";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { NotesModal } from './notes-modal';

type NotesPageState = {
    notes: Note[]
};

export class NotesPage extends React.Component<{}, NotesPageState> {

    private _notesService: NotesService;
    private _spinnerElement: HTMLDivElement | null;
    private _toastComponent: ToastComponent | null;
    private _notesDialog: NotesModal | null;

    constructor(props: any) {

        super(props);

        this._spinnerElement = null;
        this._toastComponent = null;
        this._notesDialog = null;
        this._notesService = new NotesService();

        this.state = {
            notes: []
        };
    }

    async componentDidMount() {
        await this.refresh();
    }

    async refresh() {

        if(this._spinnerElement != null) {

            createSpinner({
                target: this._spinnerElement,
                label: "Fetching Notes"
            });
            showSpinner(this._spinnerElement);
        }

        try {
            this.setState({
                notes: await this._notesService.getNotes()
            });
        }
        catch {

            if(this._toastComponent != null) {

                this._toastComponent.show({
                    content: "Error Fetching Notes",
                    cssClass: "e-toast-danger"
                });
            
            }

        }
        finally {

            if(this._spinnerElement != null) {
                hideSpinner(this._spinnerElement);
            }

        }
    }

    editClick(noteID: number) {

        let selectedNote = this.state.notes.find((note) => note.id! === noteID);
        this._notesDialog?.show(selectedNote);

    }

    async onNoteSaved(success: boolean) {

        if(success) {

            this._toastComponent?.show({
                content: "Note saved",
                cssClass: "e-toast-success"
            });

            await this.refresh();

        } else {

            this._toastComponent?.show({
                content: "Error saving note",
                cssClass: "e-toast-danger"
            });

        }
    }

    async deleteClick(noteID: number) {

        try {
            
            if(await this._notesService.deleteNote(noteID)) {

                this.setState({
                    notes: this.state.notes.filter((note => note.id! !== noteID))
                });

                if(this._toastComponent != null) {

                    this._toastComponent.show({
                        content: "Note Deleted",
                        cssClass: "e-toast-success"
                    });

                }
            }

        } catch {

            if(this._toastComponent != null) {

                this._toastComponent.show({
                    content: "Error Deleting Note",
                    cssClass: "e-toast-danger"
                });

            }
        }
    }

    render() {

        let noteElements: React.ReactElement[] = [];

        this.state.notes.forEach(note => {

            let tagComponent;

            if(note.tags != null && note.tags.length > 0) {

                tagComponent = 
                    <ChipListComponent >
                        <ChipsDirective>
                            {note.tags.map(t => <ChipDirective text={t} enabled={false} cssClass="notes-tag"></ChipDirective>)}
                        </ChipsDirective>
                    </ChipListComponent>;
                
            }

            noteElements.push(
                <div className="card" key={note.id}>
                    <div className="card-body pb-3 pt-3">
                        <div className="d-flex justify-content-between">
                            <h4 className="card-title">{note.title}</h4>
                            <div>
                                <IconButton 
                                    title="Edit" 
                                    iconCSSClass="bi-pencil-square"
                                    clickHandler={() => this.editClick(note.id!)} />
                                <IconButton 
                                    title="Delete"  
                                    iconCSSClass="bi-x-square"
                                    clickHandler={() => this.deleteClick(note.id!)} />
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: note.content}}></div>
                        {tagComponent}
                    </div>
                </div>
            );
        });

        return (
            <div className="notes-container">
                <div ref={spinner => this._spinnerElement = spinner} id="spinner"/>
                <div>
                    {noteElements}
                </div>
                <ToastComponent ref={toast => this._toastComponent = toast!} position={{X: "Right", Y: "Bottom"}} />
                <NotesModal target="#root" onSaveCallback={(success: boolean) => this.onNoteSaved(success)} ref={dialog => this._notesDialog = dialog} />
            </div>
        );
    }
}