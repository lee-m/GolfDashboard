import { Course, TeeBox } from '../../../models';
import { TeeBoxBadge } from './tee-box-badge';
import DataGrid, { Column, Editing, Paging, FormItem } from 'devextreme-react/data-grid';

export function CourseTab(props: { data: Course }) {
    return (
        <div className="pt-3">
            <DataGrid dataSource={props.data.teeBoxes} keyExpr="id" showBorders={true} >
                <Paging enabled={false} />
                <Editing mode="form" allowUpdating={true} allowDeleting={true} useIcons={true} />
                <Column dataField="colour" caption="" width="auto" allowEditing="false" cellRender={TeeBoxBadgeColumnTemplate}>
                    <FormItem visible={false} />
                </Column>
                <Column dataField="name" caption="Name" />
                <Column dataField="yards" caption="Length (yards)" dataType="number" />
                <Column dataField="par" caption="Par" dataType="number" />
                <Column dataField="sss" caption="SSS" dataType="number" />
                <Column dataField="rating" caption="Rating" dataType="number" />
            </DataGrid>
        </div>
    )
}

function TeeBoxBadgeColumnTemplate(cellData: { data: TeeBox }) {
    return (
        <TeeBoxBadge colour={cellData.data.colour} />
    );
}
