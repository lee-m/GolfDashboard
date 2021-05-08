import React from "react";
import { Note, Tag } from '../../models';

export interface NotesContextState {

    notes: Note[],
    tags: Tag[],
    hiddenNoteIDs: Set<number>,
    filterPanelVisible: boolean,

    hideNotes: (noteIDs: Set<number>) => void,
    updateNotesData: (newNotes: Array<Note>, newTags: Array<Tag>) => void,
    toggleFilterVisibility: (visible: boolean) => void
};

export const NotesContext = React.createContext<NotesContextState>({

    notes: new Array<Note>(),
    tags: new Array<Tag>(),
    hiddenNoteIDs: new Set<number>(),
    filterPanelVisible: true,

    hideNotes: (noteIDs: Set<number>) => { },
    updateNotesData: (newNotes: Array<Note>, newTags: Array<Tag>) => { },
    toggleFilterVisibility: (visible: boolean) => { }

});