import { useState, } from 'react';
import Button from 'devextreme-react/button'
import { Separator } from '../../components';
import { NotesSidebar, NotesModal, useNotesModalContext } from '.';

import AddIcon from '../../images/document-add.svg';
import FilterIcon from '../../images/filter.svg';

export function NotesPageContainer(props: any) {

    const notesModalContext = useNotesModalContext();
    const [filterPanelVisible, setFilterPanelVisible] = useState(false);

    return (
        <div className="notes-container relative flex-grow">
            <div className="notes-opts space-x-2">
                <Button icon={AddIcon} text="Create New Note" onClick={notesModalContext.addNote} disabled={false} stylingMode="contained" type="default" />
                <Button icon={FilterIcon} text="Toggle Filter" onClick={() => setFilterPanelVisible(!filterPanelVisible)} disabled={false} stylingMode="contained" type="normal" />
            </div>
            <Separator cssClass="notes-separator" />
            {props.children}
            <NotesSidebar
                visible={filterPanelVisible}
                hideFilter={() => setFilterPanelVisible(false)} />
            <NotesModal
                key="modal"
                visible={notesModalContext.visible}
                selectedNote={notesModalContext.selectedNote}
                onClose={notesModalContext.hideModal} />
        </div>
    );
}