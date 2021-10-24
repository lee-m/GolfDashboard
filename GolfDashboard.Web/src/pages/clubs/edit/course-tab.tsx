import { Course, TeeBox } from '../../../models';
import { TeeBoxBadge } from './tee-box-badge';
import DataGrid, { Column, Editing, Paging, FormItem, RequiredRule, RangeRule } from 'devextreme-react/data-grid';
import ArrayStore from 'devextreme/data/array_store';
import { useEditClubContext } from './edit-club-context';

const dropDownEditorOptions = {
    dataSource: new ArrayStore({
        data: [
            { colour: "#cc0000", name: "Red" },
            { colour: "#eeff00", name: "Yellow" },
            { colour: "white", name: "White" }
        ],
        key: 'colour'
    }),
    displayExpr: "name",
    valueExpr: "colour"
};

export function CourseTab(props: { data: Course }) {

    const editClubContext = useEditClubContext();

    const initNewTeeBoxRow = (e: { data: TeeBox }) => {
        e.data.id = -(props.data.teeBoxes.length + 1);
    };

    return (
        <div className="pt-3">
            <DataGrid id="edit-club-course-grid"
                dataSource={props.data.teeBoxes}
                keyExpr="id"
                showBorders={true}
                onInitNewRow={initNewTeeBoxRow}
                onSaved={() => editClubContext.updateSaveEnabled(true)}>
                <Paging enabled={false} />
                <Editing mode="form" allowUpdating={true} useIcons={true} allowAdding={true} />
                <Column dataField="colour" caption="" width="auto" allowEditing="false" cellRender={TeeBoxBadgeColumnTemplate}>
                    <FormItem editorType="dxSelectBox" editorOptions={dropDownEditorOptions}>
                    </FormItem>
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
                <Column dataField="slope" caption="Slope" dataType="number">
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