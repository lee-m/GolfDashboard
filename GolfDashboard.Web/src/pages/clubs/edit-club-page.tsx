import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from "react-query";
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button'
import { LoadingOverlay } from '../../components';
import { GolfClub } from '../../models';

import './edit-club.css';

import ArrowBackIcon from '../../images/arrow-back.svg';
import SaveIcon from '../../images/save.svg';
import { APIService } from '../../services';
import { PopupUtils } from '../../popupUtils';

interface EditClubPageURLParameters {
    clubID?: string
}

interface ClubDetails {
    name: string,
    website: string
}

export function EditClubPage(props: any) {

    const history = useHistory();
    const params: EditClubPageURLParameters = useParams();
    const [saveEnabled, setSaveEnabled] = useState<boolean>(false);

    const [clubDetails, setClubDetails] = useState<ClubDetails>({
        name: "",
        website: ""
    });

    const clubEditQuery = useQuery<GolfClub, Error>("GetClubForEditing", async () => {

        const apiService = new APIService();
        return await apiService.getClub(parseInt(params.clubID!));

    }, {
        refetchOnWindowFocus: false,
        onError: (e) => {
            PopupUtils.errorToast("Error Loading Club Details");
        },
        onSuccess: (data: GolfClub) => {
            setClubDetails({
                name: data.name,
                website: data.website
            });
        }
    });

    if (clubEditQuery.isLoading || clubEditQuery.isIdle) {
        return <LoadingOverlay />
    }

    if (!clubEditQuery.isSuccess) {
        return <div />
    }

    const club = clubEditQuery.data;

    if (!club) {
        return <h2>Invalid Club ID</h2>
    }

    return (
        <div className="px-3 pt-3 space-y-3 scrollable-container">
            <div className="flex flex-row justify-between">
                <div className="flex">
                    <Button
                        icon={ArrowBackIcon}
                        stylingMode="text"
                        hint="Back"
                        onClick={() => history.goBack()} />
                    <h2>{club.name}</h2>
                </div>
                <Button
                    icon={SaveIcon}
                    text="Save"
                    disabled={!saveEnabled}
                    stylingMode="contained"
                    type="default"
                    onClick={() => alert(JSON.stringify(clubDetails))} />
            </div>
            <div className="edit-club-details space-x-3">

                <span className="text-gray-500 inline-flex items-center">Name:</span>
                <TextBox value={clubDetails.name} onInput={(e) => {
                    setClubDetails({
                        ...clubDetails,
                        name: e.component.option("text")
                    });
                    setSaveEnabled(true);
                }} />

                <span className="text-gray-500 inline-flex items-center">Website:</span>
                <TextBox value={clubDetails.website} onInput={(e) => {
                    setClubDetails({
                        ...clubDetails,
                        website: e.component.option("text")
                    });
                    setSaveEnabled(true);

                }} />

            </div>
        </div>
    );
}
