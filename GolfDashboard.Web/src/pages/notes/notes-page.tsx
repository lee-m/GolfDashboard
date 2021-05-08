import { useEffect, useState, useCallback } from 'react';
import Button from 'devextreme-react/button'

import { Note, Tag } from '../../models';
import { NotesPageController, NotesList, NotesSidebar, NotesContext, NotesModal } from '../notes';
import { PopupUtils } from '../../popupUtils';
import { APIService } from '../../services';
import { DeletePrompt, Separator } from '../../components';

import "./notes.css";

interface NotesDataState {
    loading: boolean;
    filterVisible: boolean;
    tags: Tag[],
    notes: Note[]
};

export function NotesPage(props: any) {

    const [notesData, setNotesData] = useState<NotesDataState>({
        loading: true,
        filterVisible: false,
        tags: [],
        notes: []
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [noteDeletePromptVisible, setNoteDeletePromptVisible] = useState(false);
    const [tagDeletePromptVisible, setTagDeletePromptVisible] = useState(false);
    const [hiddenNoteIDs, setHiddenNoteIDs] = useState(new Set<number>());
    const [filterPanelVisible, setFilterPanelVisible] = useState(false);

    const context = {
        notes: notesData.notes,
        tags: notesData.tags,
        hiddenNoteIDs: hiddenNoteIDs,
        filterPanelVisible: filterPanelVisible,

        hideNotes: (noteIDs: Set<number>) => {
            setHiddenNoteIDs(noteIDs);
        },
        updateNotesData: (notes: Array<Note>, tags: Array<Tag>) => {

            const newData = { ...notesData, notes: notes, tags: tags };
            setNotesData(newData);

        },
        toggleFilterVisibility: (visible: boolean) => {
            setFilterPanelVisible(visible);
        }
    };

    const pageController = new NotesPageController(context);

    const deleteNote = async () => {
        await pageController.deleteNote(selectedNote!.id!)
        setNoteDeletePromptVisible(false);
        PopupUtils.infoToast("Note deleted");
    };

    const deleteTag = async () => {
        await pageController.deleteTag(selectedTag!.id!)
        setTagDeletePromptVisible(false);
        PopupUtils.infoToast("Tag deleted");
    };

    const saveNote = async (note: Note) => {

        if (await pageController.saveNote(note)) {
            setModalVisible(false);
        }

    };

    const addNote = () => {
        setSelectedNote(null);
        setModalVisible(true)
    };

    const confirmTagDeletion = (tag: Tag) => {
        setSelectedTag(tag);
        setTagDeletePromptVisible(true);
    };

    useEffect(() => {

        const getNotes = async () => {

            try {

                const apiService = new APIService();
                const notes = await apiService.getNotes();
                const tags = await apiService.getTags();

                setNotesData({
                    loading: false,
                    filterVisible: true,
                    notes: notes,
                    tags: tags
                });

            } catch {

                PopupUtils.errorToast("Error loading notes");
                setNotesData({
                    loading: false,
                    filterVisible: false,
                    notes: [],
                    tags: []
                });
            }

        }

        getNotes();

    }, []);

    const onNoteEdit = useCallback((note: Note) => {
        setSelectedNote(note);
        setModalVisible(true);
    }, []);

    const onNoteDelete = useCallback((note: Note) => {
        setSelectedNote(note);
        setNoteDeletePromptVisible(true);
    }, []);

    return (

        <NotesContext.Provider value={context}>
            <div className="notes-container relative flex-grow">
                <div className="notes-opts space-x-2">
                    <Button text="Create New Note" onClick={() => addNote()} disabled={false} stylingMode="contained" type="default" />
                    <Button text="Toggle Filter" onClick={() => setFilterPanelVisible(!filterPanelVisible)} disabled={false} stylingMode="contained" type="normal" />
                </div>
                <Separator cssClass="notes-separator" />
                <NotesList
                    notes={notesData.notes}
                    loading={notesData.loading}
                    onEdit={onNoteEdit}
                    onDelete={onNoteDelete} />
                <NotesSidebar
                    updateFilter={(tags: string[]) => pageController.updateTagsFilter(tags)}
                    deleteTag={(tag: Tag) => confirmTagDeletion(tag)}
                    addNote={() => addNote()} />
                <NotesModal visible={modalVisible}
                    tags={notesData.tags}
                    selectedNote={selectedNote}
                    onSave={saveNote}
                    onClose={() => setModalVisible(false)} />
                <DeletePrompt visible={noteDeletePromptVisible}
                    title="Confirm Note Deletion"
                    message={`The note '${selectedNote?.title ?? ""}' will be deleted. Do you wish to continue?`}
                    onDelete={deleteNote}
                    onCancel={() => setNoteDeletePromptVisible(false)} />
                <DeletePrompt visible={tagDeletePromptVisible}
                    title="Confirm Tag Deletion"
                    message={`The tag '${selectedTag?.text ?? ""}' will be deleted and removed from any notes. Do you wish to continue?`}
                    onDelete={() => deleteTag()}
                    onCancel={() => setTagDeletePromptVisible(false)} />
            </div>
        </NotesContext.Provider>
    );
}

