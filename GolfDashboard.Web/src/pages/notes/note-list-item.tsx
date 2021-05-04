import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { NotesContext } from '../notes';
import { Note } from '../../models';
import { EditButton, DeleteButton } from '../../components';

type NoteListItemProps = {
    note: Note,
    onDelete: () => void,
    onEdit: () => void
};

interface SpringProps {
    opacity: number,
    height?: number
    marginBottom: string
}

export function NoteListItem(props: NoteListItemProps) {

    let tagComponent: React.ReactElement | null = null;

    const notesContext = useContext(NotesContext);
    const listItemRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const isVisible = !notesContext.softDeletedNoteIDs.has(props.note.id!) && !notesContext.hiddenNoteIDs.has(props.note.id!);

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

    useLayoutEffect(() => {

        //Capture the height of this item in case we need to animate it's removal from the list
        if (listItemRef.current) {
            setHeight(listItemRef.current.getBoundingClientRect().height);
        }

    }, []);

    if (props.note.tags != null && props.note.tags.length > 0) {

        tagComponent =
            <div className="pt-2 space-x-2">
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
        <animated.div style={itemAnimation} ref={listItemRef}>
            <div className="border-gray-300 border rounded p-3 bg-white shadow" key={props.note.id}>
                <div>
                    <div className="flex justify-between">
                        <h4 className="text-xl">{props.note.title}</h4>
                        <div className="space-x-3">
                            <EditButton clickHandler={() => props.onEdit()} />
                            <DeleteButton clickHandler={() => props.onDelete()} />
                        </div>
                    </div>
                    <div className="pb-2 pt-1" dangerouslySetInnerHTML={{ __html: props.note.content }}></div>
                    {tagComponent}
                </div>
            </div>
        </animated.div>
    );
}