import { ChipModel, DeleteEventArgs } from '@syncfusion/ej2-react-buttons';

import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';
import { NotesContextState } from '../notes';

export class NotesPageController {

    private _apiService: APIService;
    private _notesContext: NotesContextState;

    constructor(notesContext: NotesContextState) {
        this._apiService = new APIService();
        this._notesContext = notesContext;
    }

    async loadNotesData() {

        const apiService = new APIService();
        this._notesContext.updateNotes(await apiService.getNotes());
        this._notesContext.updateTags(await apiService.getTags());

    }

    confirmTagDeletion(e: DeleteEventArgs | undefined) : void {

        if(e) {

            e.cancel = true;

            let tagModel = e.data as ChipModel;
            let tagID = tagModel.value as number;

            let confirmDialog = PopupUtils.showConfirmationDialog({
                content: `The tag '${tagModel.text}' will be deleted and removed from any notes currently using it. Do you wish to continue?`,
                okButton: { 
                    text: 'OK', 
                    click: async () => {

                        this.deleteTag(tagID);
                        confirmDialog.close();
                    }
                },
                title: "Confirm Tag Deletion",
            });

        }

    }

    confirmNoteDeletion(noteID: number): void {

        const dialog = PopupUtils.showConfirmationDialog({
            content: "This note will be deleted. Do you wish to continue?",
            title: "Confirm Note Deletion",
            okButton: { 
                text: 'OK', 
                click: () => {

                    this.deleteNote(noteID);
                    dialog.close();

                }
            }
        });

    }

    editNote(noteID: number) {
        alert("todo");
    }

    updateTagsFilter() {
        alert("todo");
    }

    private async deleteTag(tagID: number) {

        if(await this._apiService.deleteTag(tagID)) {

            //Deleting a tag can update notes if that tag was removed from it so we need to refresh 
            //the notes
            this._notesContext.updateTags(this._notesContext.tags.filter(t => t.id !== tagID))
            this._notesContext.updateNotes(await this._apiService.getNotes());
            
            PopupUtils.infoToast("Tag deleted");
        }
    }

    private deleteNote(noteID: number) {

        this._notesContext.markNoteAsDeleted(noteID);
        this._apiService.deleteNote(noteID);
        PopupUtils.infoToast("Note deleted");

    }
}