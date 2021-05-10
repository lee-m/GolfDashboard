import { useState, useCallback, useEffect, useRef } from 'react';
import Button from 'devextreme-react/button'
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import dxHtmlEditor from 'devextreme/ui/html_editor';

import { AnimatedButton } from '../../components';
import { NotesTagEditor } from './';
import { Note, Tag } from '../../models';

interface NotesModalProps {
    initialTitle: string,
    initialTags: string[],
    initialContent: string,
    existingNoteID: number | undefined
    visible: boolean;
    tags: Array<Tag>;
    onSave: (note: Note) => Promise<void>;
    onClose: () => void;
};

export function NotesModal(props: NotesModalProps) {

    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [titleCSSClass, setTitleCSSClass] = useState("");
    const [contentCSSClass, setContentCSSClass] = useState("");

    //The HTML editor component is still CTP and doesn't seem to play well if we set the value to a state variable (keeps resetting input focus)
    //so for now we store a ref to it and use that ref to get the content out of it
    const htmlEditorRef = useRef<dxHtmlEditor | null>(null);

    useEffect(() => {
        setTitle(props.initialTitle);
        setSelectedTags(props.initialTags);
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
            id: props.existingNoteID,
            title: title,
            content: content,
            tags: selectedTags
        };

        await props.onSave(noteContents);

    }, [title, selectedTags, props]);

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
                    tags={props.tags}
                    selectedTags={selectedTags}
                    onTagSelectionChange={(newTags: string[]) => setSelectedTags(newTags)} />
                <div className={"flex flex-grow"}>
                    <HtmlEditor height="100%"
                        width="100%"
                        defaultValue={props.initialContent}
                        key={props.initialContent}
                        elementAttr={{ class: contentCSSClass }}
                        onInitialized={(e) => htmlEditorRef.current = e.component!}>
                        <Toolbar>
                            <Item formatName="bold" />
                            <Item formatName="italic" />
                            <Item formatName="underline" />
                            <Item formatName="separator" />
                            <Item formatName="header" formatValues={[false, 1, 2, 3, 4, 5]} />
                            <Item formatName="separator" />
                            <Item formatName="orderedList" />
                            <Item formatName="bulletList" />
                            <Item formatName="link" />
                            <Item formatName="separator" />
                            <Item formatName="alignLeft" />
                            <Item formatName="alignCenter" />
                            <Item formatName="alignRight" />
                            <Item formatName="alignJustify" />
                            <Item formatName="separator" />
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