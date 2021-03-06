import { useState, useCallback, useEffect, useRef } from 'react';
import Button from 'devextreme-react/button'
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import dxHtmlEditor from 'devextreme/ui/html_editor';

import { Note } from '../../models';
import { AnimatedButton } from '../../components';
import { NotesTagEditor, useTagsQuery, useNotesMutator } from './';

export interface NotesModalProps {
    visible: boolean,
    selectedNote: Note,
    onClose: () => void
}
export function NotesModal(props: any) {

    const tagsQuery = useTagsQuery();
    const notesMutator = useNotesMutator();

    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [titleCSSClass, setTitleCSSClass] = useState("");
    const [contentCSSClass, setContentCSSClass] = useState("");

    //The HTML editor component is still CTP and doesn't seem to play well if we set the value to a state variable (keeps resetting input focus)
    //so for now we store a ref to it and use that ref to get the content out of it
    const htmlEditorRef = useRef<dxHtmlEditor | null>(null);

    useEffect(() => {
        setTitle(props.selectedNote?.title ?? "");
        setSelectedTags(props.selectedNote?.tags ?? []);
    }, [props]);

    const saveNewNote = useCallback(async () => {

        var content = htmlEditorRef.current!.option("value");
        var titleMissing = !title
        var contentMissing = !content;

        if (titleMissing || contentMissing) {

            setTitleCSSClass(titleMissing ? "border-accent-red" : "");
            setContentCSSClass(contentMissing ? "border-accent-red" : "");
            return;
        }

        var noteContents = {
            id: props.selectedNote?.id,
            title: title,
            content: content,
            tags: selectedTags
        };

        notesMutator.update(noteContents);
        props.onClose();

    }, [title, selectedTags, props, notesMutator]);

    const onClose = useCallback(() => {
        htmlEditorRef.current?.option("value", null);
        props.onClose();
    }, [props]);

    return (
        <Popup width="60%"
            height="60%"
            showTitle={true}
            visible={props.visible}
            title="Add New Note"
            showCloseButton={false}>
            <div className="flex flex-col h-full space-y-2">
                <TextBox placeholder="Title"
                    showClearButton={true}
                    stylingMode="underlined"
                    elementAttr={{ class: titleCSSClass }}
                    value={title}
                    onValueChanged={(e) => setTitle(e.value!)} />
                <NotesTagEditor
                    tags={tagsQuery.data || []}
                    selectedTags={selectedTags}
                    onTagSelectionChange={(newTags: string[]) => setSelectedTags(newTags)} />
                <div className={"flex flex-grow"}>
                    <HtmlEditor height="100%"
                        width="100%"
                        defaultValue={props.selectedNote?.content}
                        key={props.selectedNote?.content}
                        elementAttr={{ class: contentCSSClass }}
                        onInitialized={(e) => htmlEditorRef.current = e.component!}>
                        <Toolbar>
                            <Item name="bold" />
                            <Item name="italic" />
                            <Item name="underline" />
                            <Item name="separator" />
                            <Item name="header" acceptedValues={[false, 1, 2, 3, 4, 5]} />
                            <Item name="separator" />
                            <Item name="orderedList" />
                            <Item name="bulletList" />
                            <Item name="link" />
                            <Item name="separator" />
                            <Item name="alignLeft" />
                            <Item name="alignCenter" />
                            <Item name="alignRight" />
                            <Item name="alignJustify" />
                            <Item name="separator" />
                        </Toolbar>
                    </HtmlEditor>
                </div>
                <div className="flex self-end">
                    <div className="flex pt-2 space-x-2">
                        <AnimatedButton text="Save" onClick={saveNewNote} type="default" />
                        <Button text="Cancel" onClick={onClose} stylingMode="outlined" type="normal" />
                    </div>
                </div>
            </div>
        </Popup>
    );
}