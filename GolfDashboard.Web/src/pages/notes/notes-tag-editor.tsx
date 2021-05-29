import { useCallback, useMemo } from 'react';

import TagBox from 'devextreme-react/tag-box';
import DataSource from 'devextreme/data/data_source';
import { CustomItemCreatingEvent } from 'devextreme/ui/tag_box';

import { Tag } from '../../models';

export interface NotesTagEditorProps {
    tags: Tag[],
    selectedTags: string[],
    onTagSelectionChange: (newTags: string[]) => void
}

export function NotesTagEditor(props: NotesTagEditorProps) {

    const tagBoxDataSource = useMemo(() => {
        return new DataSource({
            store: props.tags.map(t => t.text)
        });
    }, [props.tags]);

    const onCustomTagCreated = useCallback((e: CustomItemCreatingEvent) => {

        e.customItem = {
            text: e.text
        };

        e.component?.getDataSource().store().insert(e.text!);
        e.component?.getDataSource().reload();

    }, []);

    return (
        <TagBox dataSource={tagBoxDataSource}
            value={props.selectedTags}
            showClearButton={true}
            acceptCustomValue={true}
            showSelectionControls={true}
            searchEnabled={true}
            stylingMode="underlined"
            applyValueMode="useButtons"
            placeholder="Select Tags"
            onCustomItemCreating={onCustomTagCreated}
            onValueChanged={(e) => props.onTagSelectionChange(e.value)} />
    );
}