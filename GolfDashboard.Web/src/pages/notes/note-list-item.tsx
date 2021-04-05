import React, { useState } from 'react';
import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';

import { Note } from '../../models/note';
import { IconButton } from '../../icon-button';

type NoteListItemProps = {
    note: Note,
    onDelete: (noteID: number) => void,
    onEdit: (noteID: number) => void
};

export function NoteListItem(props: NoteListItemProps) {

    let tagComponent: React.ReactElement | null = null;

    if(props.note.tags != null && props.note.tags.length > 0) {
        tagComponent = 
            <ChipListComponent className="p-0">
                <ChipsDirective>
                    {props.note.tags.map((t, i) => <ChipDirective text={t} enabled={false} key={t} cssClass={"notes-tag" + (i === 0 ? " ml-0" : "")}></ChipDirective>)}
                </ChipsDirective>
            </ChipListComponent>;
    }

    let [visible, setVisible] = useState(true);

    return (
            <div className="card" key={props.note.id}>
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
                                clickHandler={() => {
                                    setVisible(false);
                                    props.onDelete(props.note.id!)} 
                                } />
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.note.content}}></div>
                    {tagComponent}
                </div>
            </div>
    );
}