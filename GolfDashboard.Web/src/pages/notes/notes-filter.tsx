import { useContext, useRef } from 'react';
import { ChipDirective, ChipListComponent, ChipsDirective, ChipModel, DeleteEventArgs } from '@syncfusion/ej2-react-buttons';

import { NotesContext } from '../notes';

interface NotesFilterProps {
    visible: boolean
    tagDeleted: (e: DeleteEventArgs | undefined) => void,
    updateFilter: (selectedTags: string[]) => void
};

export function NotesFilter(props: NotesFilterProps) {

    const notesContext = useContext(NotesContext);
    let tagListRef = useRef<ChipListComponent>(null);

    let tagDirectives = notesContext.tags.map((t) => {
        return (<ChipDirective text={t.text} value={t.id} key={t.id}></ChipDirective>);
    });

    return (
        <div className={props.visible ? "d-flex" : "d-none"}>
            <h6 className="font-bold align-self-center pl-2 pr-2 mb-0">Filter by Tag:</h6>
            <ChipListComponent ref={tagListRef}
                               selection="Multiple" 
                               enableDelete={true} 
                               delete={(e) => props.tagDeleted(e)}
                               click={() => {

                                    const selectedChips = tagListRef.current!.getSelectedChips();

                                    if(selectedChips) {

                                        const selectedTags = (selectedChips.data as ChipModel[]).map(t => t.text!);
                                        props.updateFilter(selectedTags);
                                        
                                    } else {
                                        props.updateFilter([]);
                                    }

                               }}>
                <ChipsDirective>
                    {tagDirectives}
                </ChipsDirective>
            </ChipListComponent>
        </div>
    );

};