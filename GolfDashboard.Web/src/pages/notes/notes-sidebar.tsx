import { useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Button from 'devextreme-react/button'
import { useNotesContext, NotesPageController, TagsList, useTagsMutator } from '.';
import { DeletePrompt } from '../../components';
import { Tag } from '../../models';

interface NotesFilterProps {
    visible: boolean,
    hideFilter: () => void
};

export function NotesSidebar(props: NotesFilterProps) {

    const notesContext = useNotesContext();
    const tagsMutator = useTagsMutator();

    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());
    const [tagDeletePromptVisible, setTagDeletePromptVisible] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

    const onTagCheckboxChanged = useCallback((tag: string, selected: boolean) => {

        let newTags: Set<string>;

        if (!selected) {
            newTags = new Set([...selectedTags].filter(t => t !== tag));
        } else {
            newTags = new Set([...selectedTags, tag]);
        }

        setSelectedTags(newTags);

        const controller = new NotesPageController();
        controller.updateTagsFilter(notesContext, [...newTags]);

    }, [notesContext, selectedTags]);

    const clearFilterSelection = useCallback(() => {

        setSelectedTags(new Set<string>());

        const controller = new NotesPageController();
        controller.updateTagsFilter(notesContext, []);

    }, [notesContext]);

    const confirmTagDeletion = useCallback((tag: Tag) => {
        setSelectedTag(tag);
        setTagDeletePromptVisible(true);
    }, []);

    const deleteTag = useCallback(async () => {

        tagsMutator.delete(selectedTag!.id);
        setTagDeletePromptVisible(false);

    }, [selectedTag, tagsMutator]);

    const visibleSpring = useSpring({
        transform: props.visible ? "translateX(0%)" : "translateX(100%)",
    });

    return (
        <>
            <animated.div style={visibleSpring} className={"absolute top-0 right-0 h-full px-4 py-3 flex flex-col bg-gray-200"}>
                <h4 className="text-lg pt-2 pb-1">Filter by Tag</h4>
                <TagsList onTagDelete={confirmTagDeletion}
                    selectedTags={selectedTags}
                    onTagFilterChanged={onTagCheckboxChanged} />
                <div className="flex justify-center pt-3 space-x-2">
                    <Button text="Close" type="default" stylingMode="contained" onClick={() => props.hideFilter()} />
                    <Button text="Clear" type="default" stylingMode="outlined" onClick={() => clearFilterSelection()} disabled={selectedTags.size === 0} />
                </div>
            </animated.div>
            <DeletePrompt visible={tagDeletePromptVisible}
                title="Confirm Tag Deletion"
                message={`The tag '${selectedTag?.text ?? ""}' will be deleted and removed from any notes. Do you wish to continue?`}
                onDelete={deleteTag}
                onCancel={() => setTagDeletePromptVisible(false)} />
        </>
    );

};