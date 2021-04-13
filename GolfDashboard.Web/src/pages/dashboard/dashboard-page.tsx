import * as React from 'react';
import { Separator } from '../../components';

import './dashboard-page.css';

export class DashboardPage extends React.Component {

    render() {
        return (
            <div className="flex-grow">
                <div id="dashboardRoot" className="dashboard h-full p-3">
                    <div>Handicap History</div>
                    <div>Average Score by Par</div>
                    <Separator cssClass="col-span-2" />
                    <div className="col-span-2">
                        <div className="flex">
                            <span>Recent Rounds</span>
                            <div className="ml-auto">
                                <button className="e-btn e-lib e-flat e-primary e-small self-end text-sm font-bold">Add Round</button>
                            </div>
                        </div>
                    </div>
                    <Separator cssClass="col-span-2" />
                    <div className="col-span-2">
                        <div className="flex">
                            <span>Notes</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}