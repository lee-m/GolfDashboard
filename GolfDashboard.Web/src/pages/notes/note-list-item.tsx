import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { EditButton, DeleteButton } from '../../components';
import { useNotesContext, useNotesModalContext } from '../notes';
import { Note } from '../../models';

type NoteListItemProps = {
    note: Note,
    onNoteDelete: (note: Note) => void,
};

interface SpringProps {
    opacity: number,
    height?: number
    marginBottom: string
}

export function NoteListItem(props: NoteListItemProps) {

    let tagComponent: React.ReactElement | null = null;

    const notesContext = useNotesContext();
    const notesModalContext = useNotesModalContext();

    const listItemRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const isVisible = !notesContext.hiddenNoteIDs.has(props.note.id!);

    let springProps: SpringProps = {
        opacity: isVisible ? 1 : 0,
        marginBottom: "0.5em"
    };

    //We don't want to specify a height of the item until it's been deleted since we want to animate from this items
    //original height (which is based on the content) to 0 to smoothly scroll any child list items up. 
    //
    //Any attempt to specify a height beforehand is just not possible since we pause the animation until the item is deleted
    //so if we try and adjust a default height after the first render, nothing happens.
    //
    //So the process here is as follows:
    // - don't specify a height in the spring configuration for the first render
    // - once we know how high this item is, update the spring so that if/when the item is deleted, the spring
    //   knows the starting value for animating down to 0
    // - when the item is deleted (marked as invisible), set a new height of 0 and let the spring animate down from
    //   the content height to 0
    //
    //Note - since the item is still in the list, the bottom margin we add to space items out will still be present
    //so we need to zap that on deletion as well.
    if (!isVisible) {
        springProps.height = 0;
        springProps.marginBottom = "0em";
    } else if (height > 0) {
        springProps.height = height;
    }

    const itemAnimation = useSpring({ ...springProps });

    useEffect(() => {

        //Capture the height of this item in case we need to animate it's removal from the list. There is an odd case where if a note without
        //any tags is edited to include some tags, it's height will increase beyond what we previously measured so we need to use scrollHeight here
        //to get the height of the *content*, and not the height of the containing element which may be too small to properly show the content.
        //
        //This way, when tags are added to a note without them, we'll animate out the height to fit everything
        if (listItemRef.current) {
            setHeight(listItemRef.current.scrollHeight);
        }

    }, [props]);

    if (props.note.tags != null && props.note.tags.length > 0) {

        tagComponent =
            <div className="py-2 space-x-2">
                {props.note.tags.map((t, i) => {
                    return (
                        <div className="dx-tag" key={i}>
                            <span className="dx-tag-content note-tag cursor-default">{t}</span>
                        </div>
                    );
                })}
            </div>;
    }

    return (
        <animated.div style={itemAnimation} ref={listItemRef} className="border-gray-300 border rounded bg-white shadow" key={props.note.id}>
            <div className="p-3">
                <div className="flex justify-between">
                    <h4 className="text-xl">{props.note.title}</h4>
                    <div>
                        <EditButton clickHandler={() => notesModalContext.editNote(props.note)} />
                        <DeleteButton clickHandler={() => props.onNoteDelete(props.note)} />
                    </div>
                </div>
                <div className="pb-2 pt-1" dangerouslySetInnerHTML={{ __html: props.note.content }}></div>
                {tagComponent}
            </div>
        </animated.div>
    );
}