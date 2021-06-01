import { useQuery } from "react-query";
import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';
import { GolfClub } from '../../models';

const ClubsQueryKey = "Clubs";

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