import { useEffect, useState } from 'react';
import { animated, useTrail } from 'react-spring';

import { Note, Tag } from '../../models';
import { NotesPageController, NoteListItem, NotesFilter, NotesContext, NotesModal } from '../notes';
import { PopupUtils } from '../../popupUtils';
import { APIService } from '../../services';
import { LoadingOverlay, DeletePrompt } from '../../components';

import "./notes.css";

interface NotesDataState {
    loading: boolean;
    filterVisible: boolean;
    tags: Tag[],
    notes: Note[]
};

export function NotesPage(props: any) {

    const [notesData, setNotesData] = useState<NotesDataState>({
        loading: true,
        filterVisible: false,
        tags: [],
        notes: []
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [deletePromptVisible, setDeletePromptVisible] = useState(false);
    const [softDeletedNoteIDs, setSoftDeletedNoteIDs] = useState(new Set<number>());
    const [hiddenNoteIDs, setHiddenNoteIDs] = useState(new Set<number>());

    //Apply a staggered fade in animation to each note after it's been loaded
    const visibleNotes = notesData.notes.filter(n => !softDeletedNoteIDs.has(n.id!));
    const trail = useTrail(visibleNotes.length, {
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const context = {
        notes: notesData.notes,
        tags: notesData.tags,
        softDeletedNoteIDs: softDeletedNoteIDs,
        hiddenNoteIDs: hiddenNoteIDs,

        markNoteAsDeleted: (noteID: number) => {
            setSoftDeletedNoteIDs(new Set<number>([...softDeletedNoteIDs, noteID]));
        },

        hideNotes: (noteIDs: Set<number>) => {
            setHiddenNoteIDs(noteIDs);
        },
        updateNotesData: (notes: Array<Note>, tags: Array<Tag>) => {

            const newData = { ...notesData, notes: notes, tags: tags };
            setNotesData(newData);

        }
    };

    const pageController = new NotesPageController(context);

    const deleteNote = async () => {
        await pageController.deleteNote(selectedNote!.id!)
        setDeletePromptVisible(false);
        PopupUtils.infoToast("Note deleted");
    }

    const saveNote = async (note: Note) => {

        if (await pageController.saveNote(note)) {
            setModalVisible(false);
        }

    }

    useEffect(() => {

        const getNotes = async () => {

            try {

                const apiService = new APIService();
                const notes = await apiService.getNotes();
                const tags = await apiService.getTags();

                setNotesData({
                    loading: false,
                    filterVisible: true,
                    notes: notes,
                    tags: tags
                });

            } catch {

                PopupUtils.errorToast("Error loading notes");
                setNotesData({
                    loading: false,
                    filterVisible: false,
                    notes: [],
                    tags: []
                });
            }

        }

        getNotes();

    }, []);

    return (

        <NotesContext.Provider value={context}>
            <div className="notes-container relative flex-grow p-3">
                <LoadingOverlay loading={notesData.loading}>
                    <NotesFilter visible={notesData.filterVisible}
                        updateFilter={(selectedTags: string[]) => pageController.updateTagsFilter(selectedTags)}
                        addNote={() => {
                            setSelectedNote(null);
                            setModalVisible(true)
                        }} />
                    <div className="relative flex-grow notes-list-container -mt-2">
                        <div className="absolute overflow-auto top-0 left-0 right-0 bottom-0">
                            {trail.map((props, i) => (
                                <animated.div key={visibleNotes[i].id} style={props}>
                                    <animated.div>
                                        <NoteListItem key={visibleNotes[i].id}
                                            note={visibleNotes[i]}
                                            onDelete={() => {
                                                setSelectedNote(visibleNotes[i]);
                                                setDeletePromptVisible(true);
                                            }}
                                            onEdit={() => {
                                                setSelectedNote(visibleNotes[i]);
                                                setModalVisible(true);
                                            }} />
                                    </animated.div>
                                </animated.div>
                            ))}
                        </div>
                    </div>
                    <NotesModal visible={modalVisible}
                        tags={notesData.tags}
                        selectedNote={selectedNote}
                        onSave={saveNote}
                        onClose={() => setModalVisible(false)} />
                    <DeletePrompt visible={deletePromptVisible}
                        title="Confirm Note Deletion"
                        message={`The note '${selectedNote?.title ?? ""}' will be deleted. Do you wish to continue?`}
                        onDelete={deleteNote}
                        onCancel={() => setDeletePromptVisible(false)} />
                </LoadingOverlay>
            </div>
        </NotesContext.Provider>
    );
}