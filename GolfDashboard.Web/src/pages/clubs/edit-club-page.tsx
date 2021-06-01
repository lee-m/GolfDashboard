import { useParams } from 'react-router-dom';
import Form, { Item, GroupItem, TabbedItem } from 'devextreme-react/form';
import { useClubsQuery } from './';
import { LoadingOverlay } from '../../components';
import { useState } from 'react';
import { Course } from '../../models/course';
import { GolfClub } from '../../models';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPage(props: any) {

    const params: EditClubPageURLParameters = useParams();
    const [courses, setCourses] = useState<Array<Course>>([]);

    const onDataLoad = (data: GolfClub[]) => {

        const editingClub = data.find(e => e.id === parseInt(params.clubID!));

        if (editingClub) {
            setCourses(editingClub.courses);
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
        ],
    };

    const addCourseButtonOptions = {
        icon: 'add',
        text: 'Add Course',
        onClick: () => {

            const newCourse = {
                id: -1,
                name: "New Course",
                numberOfHoles: 18,
                rating: 0,
                slope: 0,
                sss: 0
            };

            setCourses([...courses, newCourse]);

        }
    };

    const courseTabs = courses.map(c => {
        return {
            title: c.name
        };
    });

    return (
        <div className="px-3 pt-3 space-y-3">
            <h1>{club.name}</h1>
            <Form
                colCount={2}
                id="form"
                formData={club}>

                <Item dataField="address" validationRules={validationRules.address} />
                <Item dataField="website" />

                <GroupItem caption="Courses" colSpan={2}>
                    <TabbedItem name="Courses" tabs={courseTabs} />
                    <Item
                        itemType="button"
                        horizontalAlignment="left"
                        buttonOptions={addCourseButtonOptions} />
                </GroupItem>

            </Form>
        </div >
    );
}

