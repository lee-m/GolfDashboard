import * as React from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, PageSettingsModel, Filter, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { getValue } from '@syncfusion/ej2-base';
import { GolfClub } from '../../models';
import { ClubsService } from '../../services';

import './clubs-page.css';

export class ClubsPage extends React.Component {

    private _gridComponent: GridComponent | null;
    private _pageSettings: PageSettingsModel;
    private _filterSettings: FilterSettingsModel;
    private _apiService: ClubsService;

    constructor(props: {}) {

        super(props);

        this._gridComponent = null;
        this._pageSettings = {
            pageSize: 30
        };
        this._filterSettings = {
            type: 'Menu'
        };
        this.state = {
            clubs: [],
        };
        this._apiService = new ClubsService();
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => this.fetchClubsData(position),
            () => this.fetchClubsData(null));
    }

    async fetchClubsData(position: GeolocationPosition | null) {

        let dataSource = new DataManager({
            adaptor: new WebApiAdaptor(),
            url: this._apiService.clubsURL(position),
            offline: true
        });

        this._gridComponent!.dataSource = dataSource;
        this._gridComponent!.refresh();
    }

    websiteColumnTemplate(args: any) {

        let websiteVal = getValue("website", args);

        return (
            <a href={websiteVal}>{websiteVal}</a>
        );
    }

    distanceInMilesColumnTemplate(props: GolfClub): any {

        if (props.distanceInMiles == null) {
            return (
                <span>-</span>
            )
        } else {
            return (
                <span>{props.distanceInMiles.toFixed(2)}</span>
            );
        }

    }

    render() {
        return (
            <div>
                <GridComponent
                    ref={grid => this._gridComponent = grid}
                    allowPaging={true}
                    allowFiltering={true}
                    pageSettings={this._pageSettings}
                    filterSettings={this._filterSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field="name" headerText="Club Name" width="25%" type="string" />
                        <ColumnDirective field="address" headerText="Address" width="35%" allowFiltering={false} type="string" />
                        <ColumnDirective field="website" headerText="Website" width="25%" disableHtmlEncode={true} template={this.websiteColumnTemplate} allowFiltering={false} type="string" />
                        <ColumnDirective field="distanceInMiles" headerText="Distance (Miles)" width="15%" template={this.distanceInMilesColumnTemplate} type="number" />
                    </ColumnsDirective>
                    <Inject services={[Page, Filter]} />
                </GridComponent>
            </div>
        );
    }
}