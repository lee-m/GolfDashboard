import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button'
import { LoadingOverlay, FloatingLabelInput } from '../../components';
import { GolfClub, EditedClubDetails } from '../../models';

import './edit-club.css';

import ArrowBackIcon from '../../images/arrow-back.svg';
import SaveIcon from '../../images/save.svg';
import { useClubEditQuery, useClubsMutator } from './clubs-hooks';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPage(props: any) {

    const history = useHistory();
    const clubsMutator = useClubsMutator();
    const params: EditClubPageURLParameters = useParams();
    const [saveEnabled, setSaveEnabled] = useState<boolean>(false);

    const [clubDetails, setClubDetails] = useState<EditedClubDetails>({
        id: 0,
        name: "",
        website: ""
    });

    const clubEditQuery = useClubEditQuery(parseInt(params.clubID!), (data: GolfClub) => {

        setClubDetails({
            id: data.id,
            name: data.name,
            website: data.website
        });

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
                    onClick={() => clubsMutator.update(clubDetails)} />
            </div>
            <div className="edit-club-details space-x-3">
                <FloatingLabelInput name="Name" label="Name" />
            </div>
        </div>
    );
}
