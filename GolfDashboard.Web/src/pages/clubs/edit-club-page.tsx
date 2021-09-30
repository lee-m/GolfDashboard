import { EditClubPageContent } from "./edit-club-page-content";
import { EditClubContextProvider } from "./edit-club-context";

export function EditClubPage(props: any) {

    return (
        <EditClubContextProvider>
            <EditClubPageContent />
        </EditClubContextProvider>
    );
}