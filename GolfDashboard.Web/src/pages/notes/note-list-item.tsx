import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';
import { animated, useSpring } from 'react-spring';

import { NotesContext } from '../notes';
import { Note } from '../../models';
import { IconButton } from '../../icon-button';

type NoteListItemProps = {
    note: Note,
    onDelete: (noteID: number) => void,
    onEdit: (noteID: number) => void
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
    const isVisible = !notesContext.softDeletedNoteIDs.has(props.note.id!);

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
    if(!isVisible) {
        springProps.height = 0;
        springProps.marginBottom = "0em";
    } else if(height > 0) {
        springProps.height = height;
    }

    const itemAnimation = useSpring({...springProps});

    useLayoutEffect(() => {

        //Capture the height of this item in case we need to animate it's removal from the list
        if(listItemRef.current) {
            setHeight(listItemRef.current.getBoundingClientRect().height);
        }

    }, []);

    if(props.note.tags != null && props.note.tags.length > 0) {
        tagComponent = 
            <ChipListComponent className="p-0">
                <ChipsDirective>
                    {props.note.tags.map((t, i) => <ChipDirective text={t} enabled={false} key={t} cssClass={"notes-tag" + (i === 0 ? " ml-0" : "")}></ChipDirective>)}
                </ChipsDirective>
            </ChipListComponent>;
    }

    return (
        <animated.div style={itemAnimation} ref={listItemRef}>
            <div className="card m-1" key={props.note.id}>
                <div className="card-body pb-3 pt-3">
                    <div className="d-flex justify-content-between">
                        <h4 className="card-title">{props.note.title}</h4>
                        <div>
                            <IconButton 
                                title="Edit" 
                                iconCSSClass="bi-pencil-square"
                                clickHandler={() => props.onEdit(props.note.id!)} />
                            <IconButton 
                                title="Delete"  
                                iconCSSClass="bi-x-square"
                                clickHandler={() => props.onDelete(props.note.id!) } />
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.note.content}}></div>
                    {tagComponent}
                </div>
            </div>
        </animated.div>
    );
}