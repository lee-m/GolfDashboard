import { useCallback, useState } from 'react';
import { animated, useTrail } from 'react-spring';
import { LoadingOverlay } from '../../components';
import { PopupUtils } from '../../popupUtils';
import { NoteListItem, NotesPageController, useNotesContext } from '../notes';
import { DeletePrompt } from '../../components';
import { Note } from '../../models';

export function NotesList(props: any) {

    const notesContext = useNotesContext();

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [noteDeletePromptVisible, setNoteDeletePromptVisible] = useState(false);

    //Apply a staggered fade in animation to each note after it's been loaded
    const trail = useTrail(notesContext.notes.length, {
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const onNoteDelete = useCallback((note: Note) => {
        setSelectedNote(note);
        setNoteDeletePromptVisible(true);
    }, []);

    const deleteNote = useCallback(async () => {

        const controller = new NotesPageController();
        await controller.deleteNote(notesContext, selectedNote!.id!);

        setNoteDeletePromptVisible(false);
        PopupUtils.infoToast("Note deleted");

    }, [notesContext, selectedNote]);

    return (
        <>
            <LoadingOverlay loading={notesContext.loading}>
                <div className="relative flex-grow notes-list-container ml-3 mr-3">
                    <div className="absolute overflow-auto top-0 left-0 right-0 bottom-0">
                        {trail.map((springProps, i) => (
                            <animated.div key={notesContext.notes[i].id} style={springProps}>
                                <animated.div>
                                    <NoteListItem
                                        key={notesContext.notes[i].id}
                                        note={notesContext.notes[i]}
                                        onNoteDelete={onNoteDelete} />
                                </animated.div>
                            </animated.div>
                        ))}
                    </div>
                </div>
            </LoadingOverlay>
            <DeletePrompt visible={noteDeletePromptVisible}
                title="Confirm Note Deletion"
                message={`The note '${selectedNote?.title ?? ""}' will be deleted. Do you wish to continue?`}
                onDelete={deleteNote}
                onCancel={() => setNoteDeletePromptVisible(false)} />
        </>
    );
}