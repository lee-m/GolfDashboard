import DataGrid, { Column, FilterRow, Paging, Pager } from 'devextreme-react/data-grid';
import { animated, useSpring } from 'react-spring';
import { useClubsQuery } from './';

import { GolfClub } from '../../models';
import { LoadingOverlay } from '../../components';

import './clubs-page.css';

export function ClubsPage(props: any) {

    const clubsQuery = useClubsQuery();

    const distanceCellTemplate = (cellData: any) => {

        var club = cellData.data as GolfClub;

        if (club.distanceInMiles == null) {
            return (
                <div className="pr-2">
                    <span>-</span>
                </div>
            )
        } else {
            return (
                <div className="pr-2">
                    <span>{club.distanceInMiles.toFixed(2)}</span>
                </div>
            );
        }
    };

    const websiteCellTemplate = (cellData: any) => {

        var club = cellData.data as GolfClub;
        return <a href={club.website} target="_blank" rel="noreferrer">{club.website}</a>

    }

    //Infinite scrolling on the grid requires setting a specific height so we use the height
    //of the page content container element so that the grid occupies the entire content
    const getGridHeight = () => {
        return document.getElementById("page-content")!.clientHeight;
    }

    const alphanumericFilterOperators = ["contains", "startswith", "endswith"];
    const fadeInAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: clubsQuery.isLoading ? 0 : 1 }
    });

    if (clubsQuery.isLoading || clubsQuery.isIdle) {
        return <LoadingOverlay />
    }

    if (clubsQuery.isError) {
        return <div />
    }
    return (
        <div className="relative h-full">
            <animated.div style={fadeInAnimation}>
                <DataGrid dataSource={clubsQuery.data}
                    showBorders={true}
                    showColumnLines={true}
                    showRowLines={true}
                    height={getGridHeight}
                    rowAlternationEnabled={true}
                    noDataText=""
                    onEditorPreparing={(e) => {

                        if (e.parentType === "filterRow") {
                            e.editorOptions.showClearButton = true;
                        }

                    }}>

                    <FilterRow visible={true} />
                    <Paging defaultPageSize={25} />
                    <Pager
                        visible={true}
                        displayMode="full"
                        allowedPageSizes={[25, 50, 100]}
                        showPageSizeSelector={true}
                        showNavigationButtons={true} />

                    <Column dataField="name"
                        caption="Club Name"
                        width="30%"
                        type="string"
                        filterOperations={alphanumericFilterOperators} />

                    <Column dataField="address"
                        caption="Address"
                        width="35%"
                        type="string"
                        filterOperations={alphanumericFilterOperators} />

                    <Column dataField="website"
                        caption="Website"
                        width="25%"
                        type="string"
                        cellRender={websiteCellTemplate}
                        filterOperations={alphanumericFilterOperators} />

                    <Column dataField="distanceInMiles"
                        caption="Distance (Miles)"
                        width="5%"
                        minWidth={50}
                        type="numeric"
                        cellRender={distanceCellTemplate}
                        filterOperations={["<", ">", "between"]} />
                </DataGrid>
            </animated.div>
        </div>
    );
}