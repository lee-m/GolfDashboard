import { EditPageContent } from "./edit-page-content";
import { EditClubContextProvider } from "./edit-club-context";

export function EditClubPage(props: any) {

    return (
        <EditClubContextProvider>
            <EditPageContent />
        </EditClubContextProvider>
    );
}