import { useContext } from 'react';
import { ChipDirective, ChipListComponent, ChipsDirective, DeleteEventArgs } from '@syncfusion/ej2-react-buttons';
import { Tag } from '../../models';

import { NotesContext } from './notes-context';

interface NotesFilterProps {
    tagDeleted: (e: DeleteEventArgs | undefined) => void,
    updateFilter: () => void
};

export function NotesFilter(props: NotesFilterProps) {

    const notesContext = useContext(NotesContext);

    let tagDirectives = notesContext.tags.map((t) => {
        return (<ChipDirective text={t.text} value={t.id} key={t.id}></ChipDirective>);
    });

    return (
        <div className="d-flex">
            <h6 className="font-bold align-self-center pl-2 pr-2 mb-0">Filter by Tag:</h6>
            <ChipListComponent selection="Multiple" 
                                enableDelete={true} 
                                delete={(e) => props.tagDeleted(e)}
                                click={() => props.updateFilter()}>
                <ChipsDirective>
                    {tagDirectives}
                </ChipsDirective>
            </ChipListComponent>
        </div>
    );

};