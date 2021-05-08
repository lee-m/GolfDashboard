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

        const newNotes = await this._apiService.getNotes();
        const newTags = await this._apiService.getTags();

        this._notesContext.updateNotesData(newNotes, newTags);
    }

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

        this._notesContext.updateNotesData(this._notesContext.notes.filter(n => n.id! !== noteID), this._notesContext.tags);
        await this._apiService.deleteNote(noteID);

    }

    async deleteTag(tagID: number) {

        if (await this._apiService.deleteTag(tagID)) {

            //Deleting a tag can update notes if that tag was removed from it so we need to refresh 
            //the notes
            const notes = await this._apiService.getNotes();
            const tags = this._notesContext.tags.filter(t => t.id !== tagID);

            this._notesContext.updateNotesData(notes, tags);
        }
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
}