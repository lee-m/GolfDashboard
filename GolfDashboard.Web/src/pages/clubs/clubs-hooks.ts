import { useQuery } from "react-query";
import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';
import { GolfClub } from '../../models';

const ClubsQueryKey = "Clubs";

export function useClubsQuery() {

    return useQuery<GolfClub[], Error>(ClubsQueryKey, async () => {

        try {

            const apiService = new APIService();
            return await apiService.getClubs(null);

        } catch {
            PopupUtils.errorToast("Error Loading Clubs");
            return Promise.resolve([]);
        }

    });
}