import React from "react";
import { Note, Tag } from '../../models';

export interface NotesContextState {
    
    notes: Note[],
    tags: Tag[]

    updateNotes: (newNotes: Array<Note>) => void,
    updateTags: (newTags: Array<Tag>) => void,
};

export const NotesContext = React.createContext<NotesContextState>({

    notes: new Array<Note>(),
    tags: new Array<Tag>(),
    updateNotes: (newNotes: Array<Note>) => {},
    updateTags: (newTags: Array<Tag>) => {},

});