import * as React from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent,Inject, Page, PageSettingsModel, Filter, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { getValue } from '@syncfusion/ej2-base';
import { GolfClub } from '../golfClub';

import '../css/pages/clubs-page.css';

interface ClubsPageProps {
};

interface ClubsPageState {
    clubs: GolfClub[]
};

export class ClubsPage extends React.Component<ClubsPageProps, ClubsPageState> {

    private _pageSettings: PageSettingsModel;
    private _filterSettings: FilterSettingsModel;

    constructor(props: ClubsPageProps) {
        super(props);

        this._pageSettings = { 
            pageSize: 30
        };
        this._filterSettings = {
            type: 'Menu'
        };
        this.state = {
            clubs: []
        };
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            fetch("https://localhost:44392/golfclubs?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        clubs: result
                    });
                });
        });
    }

    websiteColumnTemplate(args: any) {

        let websiteVal = getValue("website", args);

        return (
            <a href={websiteVal}>{websiteVal}</a>
        );
    }

    render() {
        return (
            <GridComponent allowPaging={true} 
                           allowFiltering={true}
                           pageSettings={this._pageSettings}
                           filterSettings={this._filterSettings}
                           dataSource={this.state.clubs}>
                <ColumnsDirective>
                    <ColumnDirective field="name" headerText="Club Name" width="25%" />
                    <ColumnDirective field="address" headerText="Address" width="35%" allowFiltering={false}/>
                    <ColumnDirective field="website" headerText="Website" width="25%" disableHtmlEncode={true} template={this.websiteColumnTemplate} allowFiltering={false}/>
                    <ColumnDirective field="distanceInMiles" headerText="Distance (Miles)" width="15%" format="N2" />
                </ColumnsDirective>
                <Inject services={[Page, Filter]} />
            </GridComponent>
        );
    }
}