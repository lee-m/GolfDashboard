import React from "react";
import { Note, Tag } from '../../models';

interface NotesContextState {
    notes: Note[],
    tags: Tag[]
};

export const NotesContext = React.createContext<NotesContextState>({
    notes: new Array<Note>(),
    tags: new Array<Tag>()
});