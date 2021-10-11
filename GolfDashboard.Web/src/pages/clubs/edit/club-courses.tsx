import TabPanel from 'devextreme-react/tab-panel';
import Button from 'devextreme-react/button'

import { CourseTab } from './course-tab';
import { useEditClubContext } from './edit-club-context';

import AddIcon from '../../../images/add.svg';
import { Course } from '../../../models';

export function ClubCourses(pros: any) {

    const editContext = useEditClubContext();

    return (
        <>
            <div className="flex flex-row justify-between">
                <span className="text-lg">Available Courses</span>
                <Button
                    icon={AddIcon}
                    text="Add"
                    stylingMode="outlined"
                    type="default"
                    onClick={editContext.addCourse} />

            </div>
            <TabPanel
                noDataText="No Courses"
                dataSource={editContext.club?.courses ?? []}
                itemTitleRender={renderCourseTabTitle}
                itemComponent={CourseTab} />
        </>
    );
}

function renderCourseTabTitle(course: Course) {
    return (
        <div className="flex flex-between items-center">
            <span>{course.name}</span>
        </div>
    );
}