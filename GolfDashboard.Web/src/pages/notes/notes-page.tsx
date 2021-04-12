import { useEffect, useState } from 'react';
import { animated, useTrail, useSpring } from 'react-spring';
import { ScaleLoader } from 'react-spinners';

import { Note, Tag } from '../../models';
import { NotesPageController, NoteListItem, NotesFilter, NotesContext, NotesModal } from '../notes';
import { PopupUtils } from '../../popupUtils';
import { APIService } from '../../services';

import 'react-toastify/dist/ReactToastify.css';
import "./notes-page.css";

export function NotesPage(props: {}) {

    const [modalVisible, setModalVisible] = useState(false);
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

    //Loading element is faded out once we've finished loading the required data
    const loadingAnim = useSpring({
        from: { opacity: 1 },
        to: { opacity: loading ? 1 : 0 }
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
                setNotes(await apiService.getNotes());
                setTags(await apiService.getTags());

            } catch {
                PopupUtils.errorToast("Error loading notes");
            } finally {
                setLoading(false);
            }

        }

        getNotes();

    }, []);

    return (
        <NotesContext.Provider value={context}>
            <div className="notes-container flex-grow-1 pt-0 d-flex flex-column">
                <NotesFilter visible={true} 
                                tagDeleted={(e) => pageController.confirmTagDeletion(e)} 
                                updateFilter={(selectedTags: string[]) => pageController.updateTagsFilter(selectedTags)}
                                addNote={() => {
                                setSelectedNote(null);
                                setModalVisible(true);
                                }} />
                <div className="position-relative flex-grow-1">
                    <div className="position-absolute overflow-auto notes-list">
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
            </div>
        </NotesContext.Provider>
    );
}