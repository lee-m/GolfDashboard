import * as React from 'react';
import '../css/pages/dashboard-page.css';

export class DashboardPage extends React.Component {

    render() {
        return (
            <div className="dashboard h-100 p-3">
                <div>Handicap History</div>
                <div>Average Score by Par</div>
                <div className="separator grid-two-col-span"></div>
                <div className="grid-two-col-span">
                    <div className="d-flex">
                        <span>Recent Rounds</span>
                        <div className="ml-auto">
                            <button className="btn btn-primary btn-sm align-self-end">Add Round</button>
                        </div>
                    </div>
                </div>
                <div className="separator grid-two-col-span"></div>
                <div className="grid-two-col-span">
                    <div className="d-flex">
                        <span>Notes</span>
                        <div className="ml-auto">
                            <button className="btn btn-primary btn-sm align-self-end">Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}