import { useContext, useState } from 'react';
import Button from 'devextreme-react/button'

import { Separator } from '../../components';
import { NotesContext } from '../notes';

interface NotesFilterProps {
    visible: boolean
    updateFilter: (selectedTags: string[]) => void,
    addNote: () => void
};

export function NotesFilter(props: NotesFilterProps) {

    const notesContext = useContext(NotesContext);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());

    const onTagClick = (tag: string) => {

        let newTags: Set<string>;

        if (selectedTags.has(tag)) {
            newTags = new Set([...selectedTags].filter(t => t != tag));
        } else {
            newTags = new Set([...selectedTags, tag]);
        }

        setSelectedTags(newTags);
        props.updateFilter([...newTags]);
    };

    return (
        <div className={"notes-filter" + (!props.visible ? "hidden" : "")}>
            <div className="flex pb-2">
                <Button text="Add New Note" onClick={() => props.addNote()} disabled={false} stylingMode="contained" type="default" />
                <span className="font-semibold self-center pl-2 pr-2 mb-0">Filter by Tag:</span>
                <div className="space-x-2 flex justify-center">
                    {notesContext.tags.map((t, i) => {
                        return (
                            <div className="dx-tag cursor-pointer self-center" key={i}>
                                <span className={"dx-tag-content note-tag" + (selectedTags.has(t.text) ? "bg-secondary-300" : "")} onClick={() => onTagClick(t.text)}>{t.text}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Separator />
        </div>
    );

};