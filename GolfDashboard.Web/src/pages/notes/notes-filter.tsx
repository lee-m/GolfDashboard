import { useContext, useState } from 'react';
import { CheckBox } from 'devextreme-react/check-box';
import Button from 'devextreme-react/button'

import { NotesContext } from '../notes';
import { Tag } from '../../models';

interface NotesFilterProps {
    visible: boolean
    updateFilter: (selectedTags: string[]) => void,
    deleteTag: (tag: Tag) => void
};

export function NotesFilter(props: NotesFilterProps) {

    const notesContext = useContext(NotesContext);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());

    const onTagCheckboxChanged = (tag: string, selected: boolean) => {

        debugger;
        let newTags: Set<string>;

        if (!selected) {
            newTags = new Set([...selectedTags].filter(t => t !== tag));
        } else {
            newTags = new Set([...selectedTags, tag]);
        }

        setSelectedTags(newTags);
        props.updateFilter([...newTags]);

    }

    const clearFilterSelection = () => {
        setSelectedTags(new Set<string>());
        props.updateFilter([]);
    }

    return (
        <div className="notes-filter bg-gray-200 p-3 flex flex-col space-y-2">
            <div className="form">
                <div className="dx-fieldset">
                    <div className="dx-fieldset-header">
                        Filter by Tag
                    </div>
                    {notesContext.tags.map((t, i) => {
                        return (
                            <div className="dx-field" key={t.id}>
                                <div className="dx-field-value w-min">
                                    <div className="flex items-center">
                                        <CheckBox value={selectedTags.has(t.text)} onValueChanged={(e) => onTagCheckboxChanged(t.text, e.value)} />
                                        <Button icon="trash" stylingMode="text" hint="Delete" onClick={() => props.deleteTag(t)} />
                                    </div>
                                </div>
                                <div className="dx-field-label w-min text-gray-700">
                                    {t.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center pt-3">
                    <Button text="Clear" type="default" onClick={() => clearFilterSelection()} disabled={selectedTags.size === 0} />
                </div>
            </div>
        </div>
    );

};

