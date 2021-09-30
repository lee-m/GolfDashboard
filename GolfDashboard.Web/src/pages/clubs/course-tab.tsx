import { Course } from '../../models/course';
import { FloatingLabelTextInput, FloatingLabelNumberInput } from '../../components';

export function CourseTab(props: { data: Course }) {
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
