import { Course, TeeBox } from '../../../models';
import { TeeBoxBadge } from './tee-box-badge';
import DataGrid, { Column, Editing, Paging, FormItem, RequiredRule, RangeRule } from 'devextreme-react/data-grid';

export function CourseTab(props: { data: Course }) {
    return (
        <div className="pt-3">
            <DataGrid dataSource={props.data.teeBoxes} keyExpr="id" showBorders={true} >
                <Paging enabled={false} />
                <Editing mode="form" allowUpdating={true} useIcons={true} />
                <Column dataField="colour" caption="" width="auto" allowEditing="false" cellRender={TeeBoxBadgeColumnTemplate}>
                    <FormItem visible={false} />
                </Column>
                <Column dataField="yards" caption="Length (yards)" dataType="number">
                    <RequiredRule />
                    <RangeRule min={1} max={9999} />
                </Column>
                <Column dataField="par" caption="Par" dataType="number">
                    <RequiredRule />
                    <RangeRule min={1} max={100} />
                </Column>
                <Column dataField="sss" caption="SSS" dataType="number">
                    <RangeRule min={1} max={999} />
                </Column>
                <Column dataField="rating" caption="Rating" dataType="number">
                    <RangeRule min={1} max={999} />
                </Column>
            </DataGrid>
        </div>
    )
}

function TeeBoxBadgeColumnTemplate(cellData: { data: TeeBox }) {
    return (
        <TeeBoxBadge colour={cellData.data.colour} />
    );
}
