import { useEffect, useState, useCallback, useMemo } from 'react';

import { Note, Tag } from '../../models';
import { NotesPageController, NotesList, NotesPageContainer, NotesContext, NotesModal } from '../notes';
import { PopupUtils } from '../../popupUtils';
import { APIService } from '../../services';
import { DeletePrompt } from '../../components';

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

    const context = {
        notes: notesData.notes,
        tags: notesData.tags,
        hiddenNoteIDs: hiddenNoteIDs,

        hideNotes: (noteIDs: Set<number>) => {
            setHiddenNoteIDs(noteIDs);
        },
        updateNotesData: (notes: Array<Note>, tags: Array<Tag>) => {

            const newData = { ...notesData, notes: notes, tags: tags };
            setNotesData(newData);

        },
    };

    const pageController = useMemo(() => new NotesPageController(context), []);

    const deleteNote = useCallback(async () => {

        await pageController.deleteNote(selectedNote!.id!)
        setNoteDeletePromptVisible(false);
        PopupUtils.infoToast("Note deleted");

    }, [pageController, selectedNote]);

    const deleteTag = useCallback(async () => {

        await pageController.deleteTag(selectedTag!.id!)
        setTagDeletePromptVisible(false);
        PopupUtils.infoToast("Tag deleted");

    }, [pageController, selectedTag]);

    const saveNote = useCallback(async (note: Note) => {

        if (await pageController.saveNote(note)) {
            setModalVisible(false);
        }

    }, [pageController]);

    const addNote = useCallback(() => {
        setSelectedNote(null);
        setModalVisible(true)
    }, []);

    const confirmTagDeletion = useCallback((tag: Tag) => {
        setSelectedTag(tag);
        setTagDeletePromptVisible(true);
    }, []);

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
            <NotesPageContainer
                notes={notesData.notes}
                tags={notesData.tags}
                loading={notesData.loading}
                onAddNote={() => addNote()}
                onDeleteTag={(tag: Tag) => confirmTagDeletion(tag)}
                onFilterChange={(selectedTags: string[]) => pageController.updateTagsFilter(selectedTags)}>
                <NotesList
                    notes={notesData.notes}
                    loading={notesData.loading}
                    onEdit={onNoteEdit}
                    onDelete={onNoteDelete} />
            </NotesPageContainer>
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
        </NotesContext.Provider>
    );
}
