import { useContext } from 'react';
import { Separator } from '../../components';

import Button from 'devextreme-react/button'
import TagBox from 'devextreme-react/tag-box';

import { NotesContext } from '../notes';

interface NotesFilterProps {
    visible: boolean
    updateFilter: (selectedTags: string[]) => void,
    addNote: () => void
};

export function NotesFilter(props: NotesFilterProps) {

    const notesContext = useContext(NotesContext);
    const tagsDataSource = notesContext.tags.map(t => t.text);

    return (
        <div className={"notes-filter" + (!props.visible ? "hidden" : "")}>
            <div className="flex pb-2">
                <Button text="Add New Note" onClick={() => props.addNote()} disabled={false} stylingMode="contained" type="default" />
                <span className="font-semibold self-center pl-2 pr-2 mb-0">Filter by Tag:</span>
                <div className="w-1/4">
                    <TagBox dataSource={tagsDataSource}
                            showSelectionControls={true}
                            showClearButton={true}
                            onValueChanged={(e) => props.updateFilter(e.value)} />
                </div>
            </div>
            <Separator />
        </div>
    );

};