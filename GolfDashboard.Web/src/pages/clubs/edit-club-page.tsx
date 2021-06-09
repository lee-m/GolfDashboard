import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form, { Item, GroupItem, Tab, TabbedItem } from 'devextreme-react/form';
import Button from 'devextreme-react/button'
import { useClubsQuery } from './';
import { LoadingOverlay } from '../../components';
import { Course, GolfClub } from '../../models';

import './edit-club.css';

import ArrowBackIcon from '../../images/arrow-back.svg';
import SaveIcon from '../../images/save.svg';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPage(props: any) {

    const history = useHistory();
    const params: EditClubPageURLParameters = useParams();
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [saveEnabled, setSaveEnabled] = useState<boolean>(false);

    const onDataLoad = (data: GolfClub[]) => {

        const editingClub = data.find(e => e.id === parseInt(params.clubID!));

        if (editingClub) {
            setCourses(editingClub.courses ?? []);
        }

    }

    const clubsQuery = useClubsQuery(onDataLoad);

    if (clubsQuery.isLoading || clubsQuery.isIdle) {
        return <LoadingOverlay />
    }

    if (!clubsQuery.isSuccess) {
        return <div />
    }

    const club = clubsQuery.data.find(e => e.id === parseInt(params.clubID!));

    if (!club) {
        return <h2>Invalid Club ID</h2>
    }

    const validationRules = {
        address: [
            { type: 'required', message: 'Address is required.' },
        ]
    };

    const addCourseButtonOptions = {
        icon: 'add',
        text: 'Add Course',
        onClick: () => {

            const newCourse = {
                id: courses.length * -1,
                name: "New Course",
                numberOfHoles: 18,
                rating: 0,
                slope: 0,
                sss: 0
            };

            setCourses([...courses, newCourse]);
        }
    };

    const courseTabRender = (params: { title: string }) => {

        var course = courses.find(c => c.name === params.title)!;

        return (

            <Form formData={course} colCount={2} key={course.id}>

                <GroupItem caption="Course Details">
                    <Item dataField="name" />
                    <Item dataField="numberOfHoles" />
                </GroupItem>

                <GroupItem caption="Ratings">
                    <Item dataField="sss" />
                    <Item dataField="rating" />
                    <Item dataField="slope" />
                </GroupItem>

                <GroupItem caption="Hole Details" colSpan={2}>
                    <Item dataField="foo" />
                </GroupItem>
            </Form>
        );
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
                    disabled={saveEnabled}
                    stylingMode="contained"
                    type="default" />
            </div>
            <Form colCount={2} id="form" formData={club}>

                <Item dataField="address" validationRules={validationRules.address} />
                <Item dataField="website" />

                <GroupItem caption="Courses" colSpan={2}>
                    {courses.length > 0 && (
                        <TabbedItem>
                            {courses.map(c =>
                                <Tab title={c.name} key={c.id} render={courseTabRender} />)}
                        </TabbedItem>
                    )}
                    <Item
                        itemType="button"
                        colSpan={2}
                        horizontalAlignment="left"
                        buttonOptions={addCourseButtonOptions} />
                </GroupItem>

            </Form>
        </div>
    );
}
