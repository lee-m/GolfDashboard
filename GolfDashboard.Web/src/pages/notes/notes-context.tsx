import React, { useState, useMemo, useEffect } from "react";
import { PopupUtils } from "../../popupUtils";
import { APIService } from '../../services';
import { Note, Tag } from '../../models';

export interface NotesContextState {
    notes: Note[],
    tags: Tag[],
    loading: boolean,
    hiddenNoteIDs: Set<number>,

    hideNotes: (noteIDs: Set<number>) => void,
    updateNotesData: (newNotes: Array<Note>, newTags: Array<Tag>) => void,
};

interface NotesDataState {
    loading: boolean;
    tags: Tag[],
    notes: Note[],
};

const NotesContext = React.createContext<NotesContextState | undefined>(undefined);

export function NotesContextProvider(props: any) {

    const [notesData, setNotesData] = useState<NotesDataState>({
        loading: true,
        tags: [],
        notes: []
    });
    const [hiddenNoteIDs, setHiddenNoteIDs] = useState(new Set<number>());

    const context = useMemo(() => {

        return {
            notes: notesData.notes,
            tags: notesData.tags,
            hiddenNoteIDs: hiddenNoteIDs,
            loading: notesData.loading,

            hideNotes: (noteIDs: Set<number>) => {
                setHiddenNoteIDs(noteIDs);
            },
            updateNotesData: (notes: Array<Note>, tags: Array<Tag>) => {

                const newData = { ...notesData, notes: notes, tags: tags };
                setNotesData(newData);

            },
        };
    }, [notesData, hiddenNoteIDs]);

    useEffect(() => {

        const getNotes = async () => {

            try {

                const apiService = new APIService();
                const notes = await apiService.getNotes();
                const tags = await apiService.getTags();

                setNotesData({
                    loading: false,
                    notes: notes,
                    tags: tags
                });

            } catch {

                PopupUtils.errorToast("Error Loading Notes");
                setNotesData({
                    loading: false,
                    notes: [],
                    tags: []
                });
            }

        }

        getNotes();

    }, []);

    return (
        <NotesContext.Provider value={context}>
            {props.children}
        </NotesContext.Provider>
    );
}

export function useNotesContext() {

    const context = React.useContext(NotesContext);

    if (!context) {
        throw new Error("Missing notes context state provider");
    }

    return context;
}
