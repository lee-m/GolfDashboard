import Button from 'devextreme-react/button'
import { CheckBox } from 'devextreme-react/check-box';
import { useTagsQuery } from './';

import { Tag } from '../../models';
import TrashLogo from '../../images/trash.svg';

export interface TagsListProps {
    selectedTags: Set<string>,
    onTagFilterChanged: (tag: string, checked: boolean) => void,
    onTagDelete: (tag: Tag) => void
}

export function TagsList(props: TagsListProps) {

    const tagsQuery = useTagsQuery();

    if (!tagsQuery.isSuccess) {
        return <div />
    }

    return (
        <div className="flex-grow overflow-auto h-px space-y-2">
            {tagsQuery.data.map((t, i) => {
                return (
                    <div className="flex" key={t.id}>
                        <Button icon={TrashLogo} stylingMode="text" hint="Delete Tag" onClick={() => props.onTagDelete(t)} />
                        <div className="self-center">
                            <CheckBox value={props.selectedTags.has(t.text)}
                                onValueChanged={(e) => props.onTagFilterChanged(t.text, e.value)}
                                text={t.text} />
                        </div>
                    </div>
                )
            })}
        </div>);
}