import { useLayoutEffect, useState } from 'react';
import DataGrid, { Column, FilterRow, Scrolling } from 'devextreme-react/data-grid';
import { animated, useSpring } from 'react-spring';

import { GolfClub } from '../../models';
import { APIService } from '../../services';
import { LoadingOverlay } from '../../components';

import './clubs-page.css';

export function ClubsPage(props: any) {

    const [clubs, setClubs] = useState<Array<GolfClub>>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchClubsData = async (position: GeolocationPosition | null) => {
     
        const apiService = new APIService();
        setClubs(await apiService.getClubs(position));
    }

    useLayoutEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => fetchClubsData(position),
            () => fetchClubsData(null)
        );

    }, []);

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

    const alphanumericFilterOperators = [ "contains", "startswith", "endswith" ];
    const fadeInAnimation = useSpring({
        from: { opacity: 0},
        to: { opacity: loading ? 0 : 1 }
    });

    return (
        <div className="relative h-full">
            <LoadingOverlay loading={loading}>
                <animated.div style={fadeInAnimation}>
                    <DataGrid dataSource={clubs}
                            showBorders={true}
                            showColumnLines={true}
                            showRowLines={true}
                            height={getGridHeight}
                            visible={!loading}
                            rowAlternationEnabled={true}
                            noDataText=""
                            onContentReady={() => setLoading(false)}
                            onEditorPreparing={(e) => {

                                    if(e.parentType === "filterRow") {
                                        e.editorOptions.showClearButton = true;
                                    }

                            }}>

                        <FilterRow visible={true} />
                        <Scrolling mode="infinite" />

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
                                filterOperations={[ "<", ">", "between" ]} />
                    </DataGrid>
                </animated.div>
            </LoadingOverlay>
        </div>
    );
}