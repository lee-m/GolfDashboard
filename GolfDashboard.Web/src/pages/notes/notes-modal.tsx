import React from 'react';
import Button from 'devextreme-react/button'
import Popup from 'devextreme-react/popup';
import TagBox from 'devextreme-react/tag-box';
import TextBox from 'devextreme-react/text-box';
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import dxHtmlEditor from 'devextreme/ui/html_editor';
import Validator, { RequiredRule, } from 'devextreme-react/validator';
import dxTagBox from 'devextreme/ui/tag_box';
import { dxElement } from 'devextreme/core/element';

import { Note, Tag } from '../../models';

interface OnSaveCallback {
    (note: Note): void
}

interface OnCloseCallback {
    (): void
}

interface NotesModalProps {
    visible: boolean;
    selectedNote: Note | null;
    tags: Array<Tag>;
    onSave: OnSaveCallback;
    onClose: OnCloseCallback;
};

interface NotesModalState {
    title: string;
    selectedTags: string[],
    allTags: string[]
}

interface CustomTagCreatedArgs {
    component?: dxTagBox | undefined;
    customItem?: string | object | Promise<any>;
    element?: dxElement | undefined;
    model?: object;
    text?: string | undefined;
}

export class NotesModal extends React.Component<NotesModalProps, NotesModalState> {

    private _htmlEditor: dxHtmlEditor | null;

    constructor(props: NotesModalProps) {

        super(props);

        this._htmlEditor = null;
        this.state = {
            title: props.selectedNote?.title ?? "",
            selectedTags: props.selectedNote?.tags ?? [],
            allTags: props.tags.map(t => t.text)
        };
    }

    componentDidUpdate(prevProps: NotesModalProps, prevState: NotesModalState) {

        if (this.props.visible === prevProps.visible) {
            return;
        }

        this.setState({
            title: this.props.selectedNote?.title ?? "",
            selectedTags: this.props.selectedNote?.tags ?? [],
            allTags: this.props.tags.map(t => t.text)
        });

        this._htmlEditor?.option("value", this.props.selectedNote?.content ?? "");

    }

    render() {

        return (
            <Popup width="60%"
                height="60%"
                showTitle={true}
                visible={this.props.visible}
                title="Add New Note"
                showCloseButton={false}>
                <div className="flex flex-col h-full space-y-2">
                    <TextBox placeholder="Title"
                        showClearButton={true}
                        stylingMode="underlined"
                        value={this.state.title}
                        onValueChange={(e) => this.onTitleChanged(e)}>
                        <Validator>
                            <RequiredRule />
                        </Validator>
                    </TextBox>
                    <TagBox dataSource={this.state.allTags}
                        value={this.state.selectedTags}
                        showClearButton={true}
                        acceptCustomValue={true}
                        showSelectionControls={true}
                        searchEnabled={true}
                        stylingMode="underlined"
                        applyValueMode="useButtons"
                        placeholder="Select Tags"
                        onValueChanged={e => {
                            this.setState({
                                selectedTags: e.value
                            });
                        }}
                        onCustomItemCreating={e => this.onCustomTagCreated(e)} />
                    <div className={"flex flex-grow"}>
                        <HtmlEditor height="100%"
                            width="100%"
                            defaultValue={this.props.selectedNote?.content ?? ""}
                            onInitialized={(e) => this._htmlEditor = e.component!}>
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
                            <Validator>
                                <RequiredRule />
                            </Validator>
                        </HtmlEditor>
                    </div>
                    <div className="flex self-end">
                        <div className="flex pt-2 space-x-2">
                            <Button text="Save" onClick={(e) => this.saveNewNote(e)} stylingMode="contained" type="default" />
                            <Button text="Cancel" onClick={() => this.props.onClose()} stylingMode="outlined" type="normal" />
                        </div>
                    </div>
                </div>
            </Popup>
        );
    }

    private onCustomTagCreated(e: CustomTagCreatedArgs) {

        e.customItem = {
            text: e.text
        };

        this.setState({
            allTags: [...this.state.allTags, e.text!],
            selectedTags: [...this.state.selectedTags, e.text!]
        });
    }


    private onTitleChanged(newTitle: string): void {

        this.setState({
            title: newTitle
        });
    }

    private saveNewNote(e: { validationGroup?: any }) {

        if (!e.validationGroup.validate().isValid) {
            return;
        }

        var noteContents = {
            id: this.props.selectedNote?.id,
            title: this.state.title,
            content: this._htmlEditor?.option("value"),
            tags: this.state.selectedTags
        };

        this.props.onSave(noteContents);
    }
}
