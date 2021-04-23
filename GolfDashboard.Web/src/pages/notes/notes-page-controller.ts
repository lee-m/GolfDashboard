import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';
import { NotesContextState } from '../notes';
import { Note } from '../../models';

export class NotesPageController {

    private _apiService: APIService;
    private _notesContext: NotesContextState;

    constructor(notesContext: NotesContextState) {
        this._apiService = new APIService();
        this._notesContext = notesContext;
    }

    async refreshData() {
        this._notesContext.updateNotes(await this._apiService.getNotes());
        this._notesContext.updateTags(await this._apiService.getTags());
    }

    /*
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
    */

    updateTagsFilter(selectedTags: string[]) {

        if (selectedTags.length === 0) {
            this._notesContext.hideNotes(new Set<number>());
            return;
        }

        const noteFilteredOut = (note: Note): boolean => {
            return !note.tags.some((noteTag: string) => selectedTags.find(selectedTag => selectedTag === noteTag));
        }

        const filteredOutNoteIDs = this._notesContext.notes.filter(noteFilteredOut).map(note => note.id!);
        this._notesContext.hideNotes(new Set<number>(filteredOutNoteIDs));
    }

    async deleteNote(noteID: number) {

        this._notesContext.markNoteAsDeleted(noteID);
        await this._apiService.deleteNote(noteID);

    }

    async saveNote(note: Note): Promise<boolean> {

        try {

            if (await this._apiService.saveNote(note)) {

                await this.refreshData();
                PopupUtils.infoToast("Note Saved");

                return true;

            }

        } catch {
        }

        PopupUtils.errorToast("Error Saving Note");
        return false;
    }

    private async deleteTag(tagID: number) {

        if (await this._apiService.deleteTag(tagID)) {

            //Deleting a tag can update notes if that tag was removed from it so we need to refresh 
            //the notes
            this._notesContext.updateTags(this._notesContext.tags.filter(t => t.id !== tagID))
            this._notesContext.updateNotes(await this._apiService.getNotes());

            PopupUtils.infoToast("Tag deleted");
        }
    }
}