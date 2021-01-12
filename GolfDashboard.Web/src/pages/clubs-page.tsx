import * as React from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

export class ClubsPage extends React.Component {

    render() {
        return (
            <GridComponent>
                <ColumnsDirective>
                    <ColumnDirective field='OrderID' width='100' textAlign="Right"/>
                    <ColumnDirective field='CustomerID' width='100'/>
                    <ColumnDirective field='EmployeeID' width='100' textAlign="Right"/>
                    <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right"/>
                    <ColumnDirective field='ShipCountry' width='100'/>
                </ColumnsDirective>
            </GridComponent>
        );
    }
}