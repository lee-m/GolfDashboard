import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Form, { Item, GroupItem, SimpleItem } from 'devextreme-react/form';
import TextBox from 'devextreme-react/text-box';
import { useClubsQuery } from './';
import { LoadingOverlay } from '../../components';
import { Course, GolfClub } from '../../models';
import { FieldDataChangedEvent } from 'devextreme/ui/form';

import './edit-club.css';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPage(props: any) {

    const params: EditClubPageURLParameters = useParams();
    const [courses, setCourses] = useState<Array<Course>>([]);

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

    const courseTabRender = (params: { name: string }) => {

        var course = courses.find(c => c.name === params.name)!;

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

    const courseItems = courses.map(c => {
        return (
            <GroupItem caption={c.name} colSpan={2} key={c.id}>
                <SimpleItem
                    dataField="name"
                    render={courseTabRender}
                    key={c.id}
                    label={{ visible: false }}
                    name={c.name} />
            </GroupItem>
        )
    });

    return (
        <div className="px-3 pt-3 space-y-3 scrollable-container">
            <h1>{club.name}</h1>
            <div>
                <div className="club-edit-club-details">
                    <div className="text-gray-500">Address</div>
                    <TextBox className="dx-field-value" defaultValue={club.address} />
                    <div className="text-gray-500">Website</div>
                    <TextBox className="dx-field-value" defaultValue={club.website} />
                </div>
            </div>
            <Form
                colCount={2}
                id="form"
                formData={club}
                onFieldDataChanged={(e) => onFieldDataChanged(e)}>

                <Item dataField="address" validationRules={validationRules.address} />
                <Item dataField="website" />

                {courseItems}
                <Item
                    itemType="button"
                    colSpan={2}
                    horizontalAlignment="left"
                    buttonOptions={addCourseButtonOptions} />
            </Form>
        </div>
    );
}

function onFieldDataChanged(e: FieldDataChangedEvent): void {
    debugger;
}

