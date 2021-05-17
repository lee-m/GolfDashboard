import { NotesModalContextProvider, NotesPageContainer, NotesList } from '.';

export function NotesPageContent(props: any) {

    return (
        <NotesModalContextProvider>
            <NotesPageContainer>
                <NotesList />
            </NotesPageContainer>
        </NotesModalContextProvider>
    );
}