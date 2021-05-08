import { animated, useTrail } from 'react-spring';

import { LoadingOverlay } from '../../components';
import { NoteListItem } from '../notes';

import { Note } from '../../models';

export interface NotesListProps {
    loading: boolean,
    notes: Note[],
    onEdit: (note: Note) => void,
    onDelete: (note: Note) => void
}

export function NotesList(props: NotesListProps) {

    //Apply a staggered fade in animation to each note after it's been loaded
    const trail = useTrail(props.notes.length, {
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <LoadingOverlay loading={props.loading}>
            <div className="relative flex-grow notes-list-container ml-3 mr-3">
                <div className="absolute overflow-auto top-0 left-0 right-0 bottom-0">
                    {trail.map((springProps, i) => (
                        <animated.div key={props.notes[i].id} style={springProps}>
                            <animated.div>
                                <NoteListItem key={props.notes[i].id}
                                    note={props.notes[i]}
                                    onDelete={props.onDelete}
                                    onEdit={props.onEdit} />
                            </animated.div>
                        </animated.div>
                    ))}
                </div>
            </div>
        </LoadingOverlay>
    );
}