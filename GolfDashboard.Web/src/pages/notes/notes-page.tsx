import * as React from 'react';
import { ChipDirective, ChipListComponent, ChipModel, ChipsDirective, DeleteEventArgs } from '@syncfusion/ej2-react-buttons';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { NoteListItem } from './note-list-item'

import { Note } from '../../models/note';
import { NotesService } from '../../services';
import { ConfirmationDialog } from '../../confirmation-dialog';

import "./notes-page.css";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { NotesModal } from './notes-modal';
import { Tag } from '../../models';

interface NotesPageState {
    notes: Note[];
    allNotes: Note[];
    allTags: Tag[];
};

export class NotesPage extends React.Component<{}, NotesPageState> {

    private _notesService: NotesService;
    private _spinnerElement: HTMLDivElement | null;
    private _toastComponent: ToastComponent | null;
    private _notesDialog: NotesModal | null;
    private _confirmationDialog: ConfirmationDialog | null;
    private _tagListComponent: ChipListComponent | null;

    constructor(props: any) {

        super(props);

        this._spinnerElement = null;
        this._toastComponent = null;
        this._notesDialog = null;
        this._confirmationDialog = null;
        this._tagListComponent = null;
        this._notesService = new NotesService();

        this.state = {
            notes: [],
            allNotes: [],
            allTags: []
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

            let notes = await this._notesService.getNotes();
            let tags = await this._notesService.getTags();

            this.setState({
                notes: notes,
                allNotes: notes,
                allTags: tags
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

    deleteClick(noteID: number) {

        this._confirmationDialog?.show({
            content: "This note will be deleted. Do you wish to continue?",
            title: "Confirm Note Deletion",
            width: "25%",
            primaryButtonText: "Delete",
            primaryButtonClick: () => this.deleteNote(noteID) 
        });

    }

    async deleteNote(noteID: number) {

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

    beforeTagDeleted(e: DeleteEventArgs | undefined) : void {

        if(e) {

            e.cancel = true;

            let tagModel = e.data as ChipModel;

            this._confirmationDialog?.show({
                content: `The tag '${tagModel.text}' will be deleted and removed from any notes currently using it. Do you wish to continue?`,
                title: "Confirm Tag Deletion",
                width: "25%",
                primaryButtonText: "Delete",
                primaryButtonClick: async () => {
                    await this._notesService.deleteTag(tagModel.value as number);
                    this.refresh();
                }
            });

        }

    }

    updateFilter() {

        let selectectedChips = this._tagListComponent?.getSelectedChips();

        if(selectectedChips) {

            let selectedTags = (selectectedChips.data as ChipModel[]).map(t => t.text);
            let notePassesFilter = (note: Note) : boolean => {
                return note.tags.some((noteTag: string) => selectedTags.find(selectedTag => selectedTag === noteTag));
            }

            this.setState({
                allNotes: this.state.allNotes,
                allTags: this.state.allTags,
                notes: this.state.allNotes.filter(notePassesFilter)
            });

        } else {

            this.setState({
                allNotes: this.state.allNotes,
                allTags: this.state.allTags,
                notes: this.state.allNotes
            });

        }
    }

    render() {

        let noteElements = this.state.notes.map(note => {
            return (<NoteListItem key={note.id}
                                  note={note} 
                                  onDelete={(noteID) => this.deleteClick(noteID)} 
                                  onEdit={(noteID) => this.editClick(noteID)} />);
        });

        let tagDirectives = this.state.allTags.map((t, i) => {
            return (<ChipDirective text={t.text} value={t.id} key={t.id}></ChipDirective>);
        });

        return (
            <div className="notes-container">
                <div className="d-flex">
                    <h6 className="font-bold align-self-center pl-2 pr-2 mb-0">Filter by Tag:</h6>
                    <ChipListComponent selection="Multiple" 
                                       enableDelete={true} 
                                       delete={(e) => this.beforeTagDeleted(e)}
                                       click={() => this.updateFilter()}
                                       ref={tagList => this._tagListComponent = tagList}>
                        <ChipsDirective>
                            {tagDirectives}
                        </ChipsDirective>
                    </ChipListComponent>
                </div>
                <hr />
                <div>
                    <div ref={spinner => this._spinnerElement = spinner} id="spinner"/>
                    <div>
                        {noteElements}
                    </div>
                    <ToastComponent ref={toast => this._toastComponent = toast!} position={{X: "Right", Y: "Bottom"}} />
                </div>
                <NotesModal target=".main-content-body" 
                            onSaveCallback={(success: boolean) => this.onNoteSaved(success)} 
                            ref={dialog => this._notesDialog = dialog} />
                <ConfirmationDialog target=".main-content-body" ref={confirmDialog => this._confirmationDialog = confirmDialog} />
            </div>
        );
    }
}