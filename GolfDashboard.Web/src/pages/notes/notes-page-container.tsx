import { useState, } from 'react';
import Button from 'devextreme-react/button'

import { Separator } from '../../components';
import { NotesSidebar } from '.';

import { Note, Tag } from '../../models';

export interface NotesPageContainerProps {
    notes: Note[],
    tags: Tag[],
    loading: boolean,
    children: React.ReactElement[] | React.ReactElement

    onAddNote: () => void,
    onDeleteTag: (tag: Tag) => void,
    onFilterChange: (selectedTags: string[]) => void
}

export function NotesPageContainer(props: NotesPageContainerProps) {

    const [filterPanelVisible, setFilterPanelVisible] = useState(false);

    return (
        <div className="notes-container relative flex-grow">
            <div className="notes-opts space-x-2">
                <Button text="Create New Note" onClick={props.onAddNote} disabled={false} stylingMode="contained" type="default" />
                <Button text="Toggle Filter" onClick={() => setFilterPanelVisible(!filterPanelVisible)} disabled={false} stylingMode="contained" type="normal" />
            </div>
            <Separator cssClass="notes-separator" />
            {props.children}
            <NotesSidebar
                visible={filterPanelVisible}
                tags={props.tags}
                updateFilter={props.onFilterChange}
                deleteTag={props.onDeleteTag}
                addNote={props.onAddNote}
                hideFilter={() => setFilterPanelVisible(false)} />
        </div>
    );
}