import React from "react";
import { Note, Tag } from '../../models';

export interface NotesContextState {
    
    notes: Note[],
    tags: Tag[],
    softDeletedNoteIDs: Set<number>,
    hiddenNoteIDs: Set<number>,

    markNoteAsDeleted: (noteID: number) => void,
    hideNotes: (noteIDs: Set<number>) => void,
    updateNotes: (newNotes: Array<Note>) => void,
    updateTags: (newTags: Array<Tag>) => void,
};

export const NotesContext = React.createContext<NotesContextState>({

    notes: new Array<Note>(),
    tags: new Array<Tag>(),
    softDeletedNoteIDs: new Set<number>(),
    hiddenNoteIDs: new Set<number>(),

    markNoteAsDeleted: (noteID: number) => {},
    hideNotes: (noteIDs: Set<number>) => {},
    updateNotes: (newNotes: Array<Note>) => {},
    updateTags: (newTags: Array<Tag>) => {},

});