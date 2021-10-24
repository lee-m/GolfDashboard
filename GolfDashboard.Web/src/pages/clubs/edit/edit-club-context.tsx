import React, { useState } from "react";
import { EditedGolfClubDetails, GolfClub } from '../../../models';

export interface EditClubContextState {

    saveEnabled: boolean;
    club: EditedGolfClubDetails | null;

    setClub(club: GolfClub): void;
    updateClubName(newName: string): void;
    updateClubWebsite(newWebsite: string): void;
    updateClubAddress(newAddress: string): void;
    updateSaveEnabled(enabled: boolean): void;
    addCourse(): void
};

const EditClubContext = React.createContext<EditClubContextState | undefined>(undefined);

export function EditClubContextProvider(props: { children: any }) {

    const [saveEnabled, setSaveEnabled] = useState<boolean>(false);
    const [editingClub, setEditingClub] = useState<GolfClub | null>(null);

    const context: EditClubContextState = {

        saveEnabled: saveEnabled,
        club: editingClub,

        setClub: (club: GolfClub) => {
            setEditingClub(club);
        },

        updateClubName: (newName: string) => {
            setEditingClub({ ...editingClub!, name: newName });
            setSaveEnabled(true);
        },

        updateClubWebsite: (newWebsite: string) => {
            setEditingClub({ ...editingClub!, website: newWebsite });
            setSaveEnabled(true);
        },

        updateClubAddress: (newAddress: string) => {
            setEditingClub({ ...editingClub!, address: newAddress });
            setSaveEnabled(true);
        },

        updateSaveEnabled: (enabled: boolean) => {
            setSaveEnabled(enabled);
        },

        addCourse: () => {

            if (!editingClub) {
                return;
            }

            setEditingClub({
                ...editingClub,
                courses: [
                    ...editingClub.courses, {
                        id: (editingClub.courses.length + 1) * -1,
                        name: "New Course",
                        numberOfHoles: 18,
                        teeBoxes: [],
                    }
                ]
            });
            setSaveEnabled(true);
        }
    };

    return (
        <EditClubContext.Provider value={context}>
            {props.children}
        </EditClubContext.Provider>
    );

}

export function useEditClubContext() {

    const context = React.useContext(EditClubContext);

    if (!context) {
        throw new Error("Missing edit club context state provider");
    }

    return context;
}