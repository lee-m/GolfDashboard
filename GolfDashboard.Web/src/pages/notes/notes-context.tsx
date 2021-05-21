import React, { useState, useMemo } from "react";

export interface NotesContextState {
    hiddenNoteIDs: Set<number>,
    hideNotes: (noteIDs: Set<number>) => void,
};

const NotesContext = React.createContext<NotesContextState | undefined>(undefined);

export function NotesContextProvider(props: any) {

    const [hiddenNoteIDs, setHiddenNoteIDs] = useState(new Set<number>());

    const context = useMemo(() => {

        return {
            hiddenNoteIDs: hiddenNoteIDs,

            hideNotes: (noteIDs: Set<number>) => {
                setHiddenNoteIDs(noteIDs);
            },
        };

    }, [hiddenNoteIDs]);

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