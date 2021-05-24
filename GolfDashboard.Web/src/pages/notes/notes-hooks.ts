import { APIService } from '../../services';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Note, Tag } from '../../models';
import { PopupUtils } from "../../popupUtils";

const NotesQueryKey = "notes";
const TagsQueryKey = "tags";

export interface TagsMutator {
    delete: (tagID: number) => void
};

export interface NotesMutator {
    update: (note: Note) => void,
    delete: (noteID: number) => void
};

export function useNotesQuery() {

    return useQuery<Note[], Error>(NotesQueryKey, () => {

        try {

            const apiService = new APIService();
            return apiService.getNotes();

        } catch (Error) {
            PopupUtils.errorToast("Error Loading Notes");
            return Promise.resolve([]);
        }

    });

}

export function useTagsQuery() {

    return useQuery<Tag[], Error>(TagsQueryKey, () => {

        try {

            const apiService = new APIService();
            return apiService.getTags();

        } catch (Error) {
            PopupUtils.errorToast("Error Loading Tags");
            return Promise.resolve([]);
        }

    });

}

export function useTagsMutator(): TagsMutator {

    const queryClient = useQueryClient();

    const deleteTag = (tagID: number) => {
        const apiService = new APIService();
        return apiService.deleteTag(tagID);
    }

    const deleteMutation = useMutation(deleteTag, {
        onSuccess: () => PopupUtils.infoToast("Tag Deleted"),
        onError: () => PopupUtils.errorToast("Error Deleting Tag"),
        onSettled: () => {

            //Deleting a tag can update notes if that tag was removed from it so we need to refresh 
            //the notes as well
            queryClient.invalidateQueries(TagsQueryKey);
            queryClient.invalidateQueries(NotesQueryKey);

        }
    });

    return {
        delete: (tagID: number) => deleteMutation.mutate(tagID)
    };
}

export function useNotesMutator(): NotesMutator {

    const queryClient = useQueryClient();
    const apiService = new APIService();

    const updateNote = (note: Note) => apiService.saveNote(note);
    const deleteNote = (noteID: number) => apiService.deleteNote(noteID);

    const updateMutation = useMutation(updateNote, {
        onSuccess: () => PopupUtils.infoToast("Note Saved"),
        onError: () => PopupUtils.errorToast("Error Updating Note"),
        onSettled: () => {

            //Updating a note might have added new notes 
            queryClient.invalidateQueries(NotesQueryKey);
            queryClient.invalidateQueries(TagsQueryKey);

        }
    });

    const deleteMutation = useMutation(deleteNote, {
        onSuccess: () => PopupUtils.infoToast("Note Deleted"),
        onError: () => PopupUtils.errorToast("Error Deleting Note"),
        onSettled: () => {
            queryClient.invalidateQueries(NotesQueryKey);
        }
    })

    return {
        update: (note: Note) => updateMutation.mutate(note),
        delete: (noteID: number) => deleteMutation.mutate(noteID)
    };

}