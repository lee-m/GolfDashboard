import React, { useState } from 'react';
import { Note } from '../../models';

export interface NotesModalContextState {

    visible: boolean,
    selectedNote: Note | null,

    editNote: (note: Note) => void,
    addNote: () => void,
    hideModal: () => void
};

const NotesModalContext = React.createContext<NotesModalContextState | undefined>(undefined);


interface NotesModalEditState {
    visible: boolean,
    selectedNote: Note | null
};

export function NotesModalContextProvider(props: any) {

    const [modalEditState, setModalEditState] = useState<NotesModalEditState>({
        visible: false,
        selectedNote: null
    });

    const modalContext = {

        visible: modalEditState.visible,
        selectedNote: modalEditState.selectedNote,

        editNote: (note: Note) => {
            setModalEditState({
                visible: true,
                selectedNote: note
            });
        },

        addNote: () => {
            setModalEditState({
                visible: true,
                selectedNote: null
            });
        },

        hideModal: () => {
            setModalEditState({
                visible: false,
                selectedNote: null
            });
        }
    };

    return (
        <NotesModalContext.Provider value={modalContext}>
            {props.children}
        </NotesModalContext.Provider>
    );

}

export function useNotesModalContext() {

    const context = React.useContext(NotesModalContext);

    if (!context) {
        throw new Error("Missing notes modal context state provider");
    }

    return context;
}