import * as React from 'react';
import { Note } from '../../models';
import { NotesModal } from '../notes';

import './dashboard-page.css';

export class DashboardPage extends React.Component {

    render() {
        return (
            <div className="flex-grow-1">
                <div id="dashboardRoot" className="dashboard h-100 p-3">
                    <div>Handicap History</div>
                    <div>Average Score by Par</div>
                    <div className="separator grid-two-col-span"></div>
                    <div className="grid-two-col-span">
                        <div className="d-flex">
                            <span>Recent Rounds</span>
                            <div className="ml-auto">
                                <button className="e-btn e-lib e-flat e-primary e-small align-self-end font-size-small font-weight-bold">Add Round</button>
                            </div>
                        </div>
                    </div>
                    <div className="separator grid-two-col-span"></div>
                    <div className="grid-two-col-span">
                        <div className="d-flex">
                            <span>Notes</span>
                            <div className="ml-auto">
                                <button className="e-btn e-lib e-flat e-primary e-small align-self-end font-size-small font-weight-bold">Add Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <NotesModal target="#root" 
                            visible={false} 
                            selectedNote={null}
                            tags={[]}
                            onSave={(note: Note) => {}} 
                            onClose={() => {}} />
            </div>
        );
    }
}