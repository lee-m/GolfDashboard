import { Note } from '../../models';
import { NotesContextState } from '.';

export class NotesPageController {

    updateTagsFilter(context: NotesContextState, selectedTags: string[]) {

        /*
        if (selectedTags.length === 0) {
            context.hideNotes(new Set<number>());
            return;
        }

        const noteFilteredOut = (note: Note): boolean => {
            return !note.tags.some((noteTag: string) => selectedTags.find(selectedTag => selectedTag === noteTag));
        }

        const filteredOutNoteIDs = context.notes.filter(noteFilteredOut).map(note => note.id!);
        context.hideNotes(new Set<number>(filteredOutNoteIDs));
        */
    }
}