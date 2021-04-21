import { useEffect, useState } from 'react';
import { animated, useTrail } from 'react-spring';

import { Note, Tag } from '../../models';
import { NotesPageController, NoteListItem, NotesFilter, NotesContext, NotesModal } from '../notes';
import { PopupUtils } from '../../popupUtils';
import { APIService } from '../../services';
import { LoadingOverlay } from '../../components';

import "./notes-page.css";

export function NotesPage(props: {}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<Note[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [softDeletedNoteIDs, setSoftDeletedNoteIDs] = useState(new Set<number>());
    const [hiddenNoteIDs, setHiddenNoteIDs] = useState(new Set<number>());

    //Apply a staggered fade in animation to each note after it's been loaded
    const trail = useTrail(notes.length, {
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const context = {
        notes: notes,
        tags: tags,
        softDeletedNoteIDs: softDeletedNoteIDs,
        hiddenNoteIDs: hiddenNoteIDs,

        markNoteAsDeleted: (noteID: number) => {
            setSoftDeletedNoteIDs(new Set<number>([...softDeletedNoteIDs, noteID]));
        }, 
        hideNotes: (noteIDs: Set<number>) => {
            setHiddenNoteIDs(noteIDs);
        },
        updateNotes: (notes: Array<Note>) => setNotes(notes),
        updateTags: (tags: Array<Tag>) => setTags(tags),
    };

    const pageController = new NotesPageController(context);

    useEffect(() => {

        const getNotes = async () => {

            try {

                const apiService = new APIService();
                const notes = await apiService.getNotes();
                const tags = await apiService.getTags();

                setLoading(false);
                setFilterVisible(true);
                setNotes(notes);
                setTags(tags);

            } catch {
                PopupUtils.errorToast("Error loading notes");
                setFilterVisible(false);
                setLoading(false);
            }

        }

        getNotes();

    }, []);

    return (

        <NotesContext.Provider value={context}>
            <div className="notes-container relative flex-grow p-3">
                <LoadingOverlay loading={loading}>
                    <NotesFilter visible={filterVisible} 
                                 updateFilter={(selectedTags: string[]) => pageController.updateTagsFilter(selectedTags)}
                                 addNote={() => {
                                     setSelectedNote(null);
                                     setModalVisible(true)
                                 }} />
                    <div className="relative flex-grow notes-list-container -mt-2">
                        <div className="absolute overflow-auto top-0 left-0 right-0 bottom-0">
                            {trail.map((props, i) => (
                                <animated.div key={notes[i].id} style={props}>
                                    <animated.div>
                                        <NoteListItem key={notes[i].id}
                                                        note={notes[i]} 
                                                        onDelete={(noteID) => pageController.confirmNoteDeletion(noteID)} 
                                                        onEdit={() => {
                                                            setSelectedNote(notes[i]);
                                                            setModalVisible(true);
                                                        }} />
                                    </animated.div>
                                </animated.div>
                            ))}
                        </div>
                    </div>
                    <NotesModal target=".page-content" 
                                visible={modalVisible}
                                tags={tags}
                                selectedNote={selectedNote}
                                onSave={async (note: Note) => {

                                    if(await pageController.saveNote(note)) {
                                        setModalVisible(false);
                                    }
                                    
                                }}
                                onClose={() => setModalVisible(false)} />
                </LoadingOverlay>
            </div>
        </NotesContext.Provider>
    );
}