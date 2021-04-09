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
        <div className="position-relative w-100">
            <NotesContext.Provider value={context}>
                <div className="notes-container flex-grow-1">
                    <NotesFilter visible={!loading} 
                                tagDeleted={(e) => pageController.confirmTagDeletion(e)} 
                                updateFilter={(selectedTags: string[]) => pageController.updateTagsFilter(selectedTags)} />
                    <hr className="ml-2 mr-2" />
                    <div>
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
                    <NotesModal target=".main-content-body" 
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
            <div className="position-absolute w-100 h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <animated.div className="notes-loading" style={loadingAnim}>
                        <ScaleLoader loading={loading} height={35} width={4} radius={2} margin={2} color={"#3E517A"} />
                    </animated.div>
                </div>
            </div>
        </div>
    );
}