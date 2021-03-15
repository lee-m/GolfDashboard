import * as React from 'react';
import { ToastComponent, ToastPositionModel } from '@syncfusion/ej2-react-notifications';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, PageSettingsModel, Filter, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { getValue } from '@syncfusion/ej2-base';
import { GolfClub } from '../../models';
import { APIService } from '../../services';

import './clubs-page.css';

interface ClubsPageProps {
};

interface ClubsPageState {
    clubs: GolfClub[]
};

export class ClubsPage extends React.Component<ClubsPageProps, ClubsPageState> {

    private _pageSettings: PageSettingsModel;
    private _filterSettings: FilterSettingsModel;
    private _toastComponent: ToastComponent | null;
    private _toastPosition: ToastPositionModel;
    private _apiService: APIService;

    constructor(props: ClubsPageProps) {

        super(props);

        this._pageSettings = {
            pageSize: 30
        };
        this._filterSettings = {
            type: 'Menu'
        };
        this.state = {
            clubs: [],
        };
        this._toastComponent = null;
        this._toastPosition = { X: 'Right', Y: 'Bottom' };
        this._apiService = new APIService();

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => this.fetchClubsData(position),
            () => this.fetchClubsData(null));
    }

    async fetchClubsData(position: GeolocationPosition | null) {

        try 
        {
            this.setState({
                clubs: await this._apiService.getGolfClubs(position)
            });
        }
        catch(e)
        {
            this._toastComponent!.show({ content: 'Unable to retrieve the list of golf clubs. Please check your network connection and try again.', cssClass: 'e-toast-danger' });
        }
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
                <ToastComponent ref={toast => this._toastComponent = toast} position={this._toastPosition} />
                <GridComponent allowPaging={true}
                    allowFiltering={true}
                    pageSettings={this._pageSettings}
                    filterSettings={this._filterSettings}
                    dataSource={this.state.clubs}>
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