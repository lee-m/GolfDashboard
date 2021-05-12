import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { CheckBox } from 'devextreme-react/check-box';
import Button from 'devextreme-react/button'

import { Tag } from '../../models';
import TrashLogo from '../../images/trash.svg';

interface NotesFilterProps {
    visible: boolean,
    tags: Tag[],
    updateFilter: (selectedTags: string[]) => void,
    deleteTag: (tag: Tag) => void,
    addNote: () => void,
    hideFilter: () => void
};

export function NotesSidebar(props: NotesFilterProps) {

    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());

    const onTagCheckboxChanged = (tag: string, selected: boolean) => {

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

    const visibleSpring = useSpring({
        transform: props.visible ? "translateX(0%)" : "translateX(100%)",
    });

    return (
        <animated.div style={visibleSpring} className={"absolute top-0 right-0 h-full px-4 py-3 flex flex-col bg-gray-200"}>
            <h4 className="text-lg pt-2 pb-1">Filter by Tag</h4>
            <div className="flex-grow overflow-auto h-px space-y-2">
                {props.tags.map((t, i) => {
                    return (
                        <div className="flex" key={t.id}>
                            <Button icon={TrashLogo} stylingMode="text" hint="Delete Tag" onClick={() => props.deleteTag(t)} />
                            <div className="self-center">
                                <CheckBox value={selectedTags.has(t.text)}
                                    onValueChanged={(e) => onTagCheckboxChanged(t.text, e.value)}
                                    text={t.text} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center pt-3 space-x-2">
                <Button text="Close" type="default" stylingMode="contained" onClick={() => props.hideFilter()} />
                <Button text="Clear" type="default" stylingMode="outlined" onClick={() => clearFilterSelection()} disabled={selectedTags.size === 0} />
            </div>
        </animated.div>
    );

};

