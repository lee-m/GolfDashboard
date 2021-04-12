import { useContext, useRef } from 'react';
import { ChipDirective, ChipListComponent, ChipsDirective, ChipModel, DeleteEventArgs, ButtonComponent } from '@syncfusion/ej2-react-buttons';

import { NotesContext } from '../notes';

interface NotesFilterProps {
    visible: boolean
    tagDeleted: (e: DeleteEventArgs | undefined) => void,
    updateFilter: (selectedTags: string[]) => void,
    addNote: () => void
};

export function NotesFilter(props: NotesFilterProps) {

    const notesContext = useContext(NotesContext);
    let tagListRef = useRef<ChipListComponent>(null);

    let tagDirectives = notesContext.tags.map((t) => {
        return (<ChipDirective text={t.text} value={t.id} key={t.id}></ChipDirective>);
    });

    const clearSelectedTags = () => {
        tagListRef.current!.selectedChips = [];
        props.updateFilter([]);
    };

    const updateFilter = () => {

        const selectedChips = tagListRef.current!.getSelectedChips();

        if(selectedChips) {

            const selectedTags = (selectedChips.data as ChipModel[]).map(t => t.text!);
            props.updateFilter(selectedTags);

        } else {
            props.updateFilter([]);
        }

    };

    return (
        <div className={"notes-filter pt-2"}>
            <div className="d-flex">
                <ButtonComponent cssClass="e-small ml-2 mt-2 mb-2" isPrimary={true} content="Add New Note" onClick={() => props.addNote()} />
                <h6 className="font-bold align-self-center pl-2 pr-2 pb-1 mb-0">Filter by Tag:</h6>
                <ChipListComponent ref={tagListRef}
                                selection="Multiple" 
                                enableDelete={true} 
                                delete={(e) => props.tagDeleted(e)}
                                click={() => updateFilter()}>
                    <ChipsDirective>
                        {tagDirectives}
                    </ChipsDirective>
                </ChipListComponent>
                <ButtonComponent cssClass="e-outline e-small mt-2 mb-2" content="Clear" onClick={() => clearSelectedTags()} />
            </div>
            <hr className={"ml-2 mr-2"} />
        </div>
    );

};