import { NotesPageContent, NotesContextProvider } from '../notes';
import "./notes.css";

export function NotesPage(props: any) {

    return (
        <NotesContextProvider>
            <NotesPageContent />
        </NotesContextProvider>
    );
}
