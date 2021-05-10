import { useCallback, useMemo } from 'react';

import TagBox from 'devextreme-react/tag-box';
import DataSource from 'devextreme/data/data_source';
import dxTagBox from 'devextreme/ui/tag_box';
import { dxElement } from 'devextreme/core/element';

import { Tag } from '../../models';

interface CustomTagCreatedArgs {
    component?: dxTagBox | undefined;
    customItem?: string | object | Promise<any>;
    element?: dxElement | undefined;
    model?: object;
    text?: string | undefined;
}

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

    const onCustomTagCreated = useCallback((e: CustomTagCreatedArgs) => {

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