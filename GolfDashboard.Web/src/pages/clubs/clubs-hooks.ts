import { useMutation, useQuery, useQueryClient } from "react-query";
import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';
import { EditedClubDetails, GolfClub } from '../../models';

const ClubsQueryKey = "Clubs";
const ClubEditQueryKey = "ClubEdit";

export interface ClubMutator {
    update: (clubDetails: EditedClubDetails) => void
};

export function useClubsQuery(successCallback?: (data: GolfClub[]) => void) {

    const fetchClubsData = async (position: GeolocationPosition | null) => {

        try {

            const apiService = new APIService();
            return await apiService.getClubs(position);

        } catch {
            PopupUtils.errorToast("Error Loading Clubs");
            return [];
        }
    }

    return useQuery<GolfClub[], Error>(ClubsQueryKey, async () => {

        return await new Promise<GolfClub[]>((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => resolve(fetchClubsData(position)),
                () => resolve(fetchClubsData(null))
            );
        });

    }, {
        onSuccess: successCallback
    });
}

export function useClubEditQuery(clubID: number, onSuccess: (club: GolfClub) => void) {

    return useQuery<GolfClub, Error>(ClubEditQueryKey, async () => {

        const apiService = new APIService();
        return await apiService.getClub(clubID);

    }, {
        refetchOnWindowFocus: false,
        onError: (e) => {
            PopupUtils.errorToast("Error Loading Club Details");
        },
        onSuccess: onSuccess
    });

}

export function useClubsMutator(): ClubMutator {

    const queryClient = useQueryClient();

    const updateClub = (details: EditedClubDetails) => {

        const apiService = new APIService();
        return apiService.saveClub(details);
    }

    const updateMutation = useMutation(updateClub, {
        onSuccess: () => {

            queryClient.invalidateQueries(ClubEditQueryKey);
            PopupUtils.infoToast("Club Saved")

        },
        onError: () => PopupUtils.errorToast("Error Saving Club"),
    });

    return {
        update: (details: EditedClubDetails) => updateMutation.mutate(details)
    };
}