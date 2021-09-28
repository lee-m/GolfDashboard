import { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TabPanel from 'devextreme-react/tab-panel';
import Button from 'devextreme-react/button'
import { LoadingOverlay, FloatingLabelTextInput, FloatingLabelNumberInput, Separator } from '../../components';
import { GolfClub, EditedClubDetails, Course } from '../../models';

import './edit-club.css';

import ArrowBackIcon from '../../images/arrow-back.svg';
import SaveIcon from '../../images/save-white.svg';
import AddIcon from '../../images/add.svg';
import { useClubEditQuery, useClubsMutator } from './clubs-hooks';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPage(props: any) {

    const history = useHistory();
    const clubsMutator = useClubsMutator();
    const params: EditClubPageURLParameters = useParams();
    const [saveEnabled, setSaveEnabled] = useState<boolean>(false);
    const [clubDetails, setClubDetails] = useState<EditedClubDetails | null>(null);

    const clubEditQuery = useClubEditQuery(parseInt(params.clubID!), (data: GolfClub) => {

        setClubDetails({
            id: data.id,
            name: data.name,
            website: data.website,
            address: data.address,
            courses: data.courses
        });

    });

    const onClubNameChanged = useCallback((newName: string) => {

        debugger;
        setClubDetails({ ...clubDetails!, name: newName });
        setSaveEnabled(true);

    }, [clubDetails]);

    const onWebsiteChanged = useCallback((newWebsite: string) => {

        setClubDetails({ ...clubDetails!, website: newWebsite });
        setSaveEnabled(true);

    }, [clubDetails]);

    const onAddressChanged = useCallback((newAddress: string) => {

        setClubDetails({ ...clubDetails!, address: newAddress });
        setSaveEnabled(true);

    }, [clubDetails]);

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
                    <span className="text-2xl">{club.name}</span>
                </div>
                <Button
                    icon={SaveIcon}
                    text="Save"
                    disabled={!saveEnabled}
                    stylingMode="contained"
                    type="default"
                    onClick={() => clubsMutator.update(clubDetails!)} />
            </div>
            <div>
                <div className="edit-club-details">
                    <FloatingLabelTextInput name="Name" label="Name" value={clubDetails?.name} onValueChange={onClubNameChanged} />
                    <FloatingLabelTextInput name="Website" label="Website" value={clubDetails?.website} onValueChange={onWebsiteChanged} />
                    <FloatingLabelTextInput name="Address" label="Address" value={clubDetails?.address} onValueChange={onAddressChanged} />
                </div>
            </div>
            <Separator />
            <div className="flex flex-row justify-between">
                <span className="text-lg">Available Courses</span>
                <Button
                    icon={AddIcon}
                    text="Add"
                    stylingMode="outlined"
                    type="default"
                    onClick={() => {

                        if (!clubDetails) {
                            return;
                        }

                        setClubDetails({
                            ...clubDetails,
                            courses: [
                                ...clubDetails.courses, {
                                    id: -1,
                                    name: "New Course",
                                    numberOfHoles: 18,
                                    rating: null,
                                    slope: null,
                                    sss: null
                                }
                            ]
                        });

                    }} />

            </div>
            <TabPanel
                noDataText="No Courses"
                dataSource={clubDetails?.courses ?? []}
                itemTitleRender={renderCourseTabTitle}
                itemComponent={CourseTab} />
        </div>
    );
}

function CourseTab(props: { data: Course }) {
    return (
        <div className="edit-club-course-container pt-3">
            <div className="dx-fieldset">
                <div className="dx-fieldset-header text-sm">Course Details</div>
                <div className="dx-field">
                    <FloatingLabelTextInput name="name" label="Name" value={props.data.name} onValueChange={(newName: string) => { }} />
                </div>
            </div>
            <div className="dx-fieldset">
                <div className="dx-fieldset-header text-sm">Ratings</div>
                <div className="dx-field">
                    <FloatingLabelNumberInput name="sss" label="SSS" value={props.data.sss ?? ""} onValueChange={(newName: string) => { }} />
                </div>
                <div className="dx-field">
                    <FloatingLabelNumberInput name="slope" label="Slope" value={props.data.slope ?? ""} onValueChange={(newName: string) => { }} />
                </div>
                <div className="dx-field">
                    <FloatingLabelNumberInput name="rating" label="Rating" value={props.data.rating ?? ""} onValueChange={(newName: string) => { }} />
                </div>
            </div>
        </div>
    )
}

function renderCourseTabTitle(course: Course) {
    return (
        <div className="flex flex-between items-center">
            <span>{course.name}</span>
        </div>
    );
}
