import { useParams } from 'react-router-dom';

import { EditClubHeading } from './edit-club-heading';
import { useEditClubContext } from './edit-club-context';
import { EditClubDetails } from './edit-club-details';
import { EditClubCourses } from './edit-club-courses'
import { LoadingOverlay, Separator } from '../../components';
import { GolfClub, } from '../../models';

import './edit-club.css';

import { useClubEditQuery } from './clubs-hooks';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPageContent(props: any) {

    const params: EditClubPageURLParameters = useParams();
    const editContext = useEditClubContext();

    const clubEditQuery = useClubEditQuery(parseInt(params.clubID!), (data: GolfClub) => {

        editContext.setClub({
            id: data.id,
            name: data.name,
            website: data.website,
            address: data.address,
            courses: data.courses,
            distanceInMiles: 0
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
            <EditClubHeading />
            <EditClubDetails />
            <Separator />
            <EditClubCourses />
        </div>
    );
}
