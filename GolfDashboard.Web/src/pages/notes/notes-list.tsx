import { useCallback, useState } from 'react';
import { animated, useTrail } from 'react-spring';
import { LoadingOverlay } from '../../components';
import { NoteListItem, useNotesQuery, useNotesMutator } from '../notes';
import { DeletePrompt } from '../../components';
import { Note } from '../../models';

export function NotesList(props: any) {

    const notesQuery = useNotesQuery();
    const notesMutator = useNotesMutator();

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [noteDeletePromptVisible, setNoteDeletePromptVisible] = useState(false);

    //Apply a staggered fade in animation to each note after it's been loaded
    const trail = useTrail(notesQuery.data ? notesQuery.data.length : 0, {
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const onNoteDelete = useCallback((note: Note) => {
        setSelectedNote(note);
        setNoteDeletePromptVisible(true);
    }, []);

    const deleteNote = useCallback(async () => {
        notesMutator.delete(selectedNote!.id!);
        setNoteDeletePromptVisible(false);

    }, [notesMutator, selectedNote]);

    if (notesQuery.isLoading || notesQuery.isIdle) {
        return <LoadingOverlay />
    }

    if (notesQuery.isError) {
        return <div />
    }

    return (
        <>
            <div className="relative flex-grow notes-list-container ml-3 mr-3">
                <div className="absolute overflow-auto top-0 left-0 right-0 bottom-0">
                    {trail.map((springProps, i) => (
                        <animated.div key={notesQuery.data[i].id} style={springProps}>
                            <animated.div>
                                <NoteListItem
                                    key={notesQuery.data[i].id}
                                    note={notesQuery.data[i]}
                                    onNoteDelete={onNoteDelete} />
                            </animated.div>
                        </animated.div>
                    ))}
                </div>
            </div>
            <DeletePrompt visible={noteDeletePromptVisible}
                title="Confirm Note Deletion"
                message={`The note '${selectedNote?.title ?? ""}' will be deleted. Do you wish to continue?`}
                onDelete={deleteNote}
                onCancel={() => setNoteDeletePromptVisible(false)} />
        </>
    );
}