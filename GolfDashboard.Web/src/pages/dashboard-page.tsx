import * as React from 'react';
import '../css/components/dashboard-page.css';

export class DashboardPage extends React.Component {

    render() {
        return (
            <div className="dashboard h-100">
                <div className="grid-card">Handicap History</div>
                <div className="grid-card">Average Score by Par</div>
                <div className="grid-card grid-two-col-span">Recent Rounds</div>
                <div className="grid-card grid-two-col-span">Notes Rounds</div>
            </div>
        );
    }
}