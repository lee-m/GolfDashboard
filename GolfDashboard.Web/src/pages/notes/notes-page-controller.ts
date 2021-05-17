import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';
import { Note } from '../../models';
import { NotesContextState } from '.';

export class NotesPageController {

    private _apiService: APIService;

    constructor() {
        this._apiService = new APIService();
    }

    async refreshData(context: NotesContextState) {

        const newNotes = await this._apiService.getNotes();
        const newTags = await this._apiService.getTags();

        context.updateNotesData(newNotes, newTags);
    }

    updateTagsFilter(context: NotesContextState, selectedTags: string[]) {

        if (selectedTags.length === 0) {
            context.hideNotes(new Set<number>());
            return;
        }

        const noteFilteredOut = (note: Note): boolean => {
            return !note.tags.some((noteTag: string) => selectedTags.find(selectedTag => selectedTag === noteTag));
        }

        const filteredOutNoteIDs = context.notes.filter(noteFilteredOut).map(note => note.id!);
        context.hideNotes(new Set<number>(filteredOutNoteIDs));
    }

    async deleteNote(context: NotesContextState, noteID: number) {

        context.updateNotesData(context.notes.filter(n => n.id! !== noteID), context.tags);
        await this._apiService.deleteNote(noteID);

    }

    async deleteTag(context: NotesContextState, tagID: number) {

        if (await this._apiService.deleteTag(tagID)) {

            //Deleting a tag can update notes if that tag was removed from it so we need to refresh 
            //the notes
            const notes = await this._apiService.getNotes();
            const tags = context.tags.filter(t => t.id !== tagID);

            context.updateNotesData(notes, tags);
        }
    }

    async saveNote(context: NotesContextState, note: Note): Promise<boolean> {

        try {

            if (await this._apiService.saveNote(note)) {

                await this.refreshData(context);
                PopupUtils.infoToast("Note Saved");

                return true;

            }

        } catch {
        }

        PopupUtils.errorToast("Error Saving Note");
        return false;
    }
}