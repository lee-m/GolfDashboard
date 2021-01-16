import * as React from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent,Inject, Page, PageSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { getValue } from '@syncfusion/ej2-base';
import { GolfClub } from '../golfClub';

import '../css/pages/clubs-page.css';

interface ClubsPageProps {
};

interface ClubsPageState {
    clubs: GolfClub[]
};

export class ClubsPage extends React.Component<ClubsPageProps, ClubsPageState> {

    private _grid: GridComponent | null;
    private _pageSettings: PageSettingsModel;

    constructor(props: ClubsPageProps) {
        super(props);

        this._grid = null;
        this._pageSettings = { 
            pageSize: 50
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
            <GridComponent ref={g => this._grid = g}
                           allowPaging={true} 
                           pageSettings={this._pageSettings}
                           dataSource={this.state.clubs}>
                <ColumnsDirective>
                    <ColumnDirective field='name' headerText='Club Name' width='30%'/>
                    <ColumnDirective field='address' headerText='Address' width='35%' />
                    <ColumnDirective field='website' headerText='Website' width='25%' disableHtmlEncode={true} template={this.websiteColumnTemplate}/>
                    <ColumnDirective field='distance' headerText='Distance (Miles)' width='10%' />
                </ColumnsDirective>
                <Inject services={[Page, Filter]} />
            </GridComponent>
        );
    }
}