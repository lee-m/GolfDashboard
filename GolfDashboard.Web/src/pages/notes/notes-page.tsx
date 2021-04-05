import { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { ToastContainer, toast } from 'react-toastify';

import { Note } from '../../models';
import { NotesService } from '../../services';
import { NoteListItem } from './note-list-item'

import 'react-toastify/dist/ReactToastify.css';
import "./notes-page.css";
import { animated, config, useTrail, useSpring } from 'react-spring';

export function NotesPage(props: {}) {

    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<Note[]>([]);

    //Apply a staggered fade in animation to each note after it's been loaded
    const trail = useTrail(notes.length, {
        config: config.default,
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const loadingAnim = useSpring({
        from: { opacity: loading ? 0 : 1 },
        to: { opacity: loading ? 1 : 0 }
    });

    useEffect(() => {

        const getNotes = async () => {

            try {

                let notesService = new NotesService();
                setNotes(await notesService.getNotes());

            } catch {

                toast("Error loading notes", {
                    type: "error",
                    className: "notes-error-toast-background"
                });

            } finally {
                setLoading(false);
            }

        }

        getNotes();

    }, []);

    return (
        <div className="position-relative w-100">
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
            <div className="position-absolute w-100 h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <animated.div className="notes-loading" style={loadingAnim}>
                        <ScaleLoader loading={loading} height={35} width={4} radius={2} margin={2} color={"#3E517A"} />
                    </animated.div>
                </div>
            </div>
            <div className="notes-container flex-grow-1">
                <div>
                    {trail.map((props, i) => (
                        <animated.div key={notes[i].id} style={props}>
                            <animated.div>
                                <NoteListItem key={notes[i].id}
                                            note={notes[i]} 
                                            onDelete={(noteID) => alert("delete note " + noteID)} 
                                            onEdit={(noteID) => alert("edit note " + noteID)} />
                            </animated.div>
                        </animated.div>
                    ))}
                </div>
            </div>
        </div>
    );
}