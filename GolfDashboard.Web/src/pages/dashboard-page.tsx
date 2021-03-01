import * as React from 'react';
import { ToastComponent  } from '@syncfusion/ej2-react-notifications';
import { NotesModal } from '../components/notes-modal'

import '../css/pages/dashboard-page.css';

export class DashboardPage extends React.Component {

    private _notesDialog: NotesModal|null;
    private _toastInstance: ToastComponent|null;

    constructor(props: any) {

        super(props);

        this._notesDialog = null;
        this._toastInstance = null;
        this.addNoteClick = this.addNoteClick.bind(this);
        this.onNoteSaved = this.onNoteSaved.bind(this);
        
    }

    addNoteClick() {
        this._notesDialog?.show();
    }

    onNoteSaved(success: boolean) {

        if(success) {

            this._toastInstance?.show({
                content: "Note saved",
                cssClass: "e-toast-success"
            });

        } else {

            this._toastInstance?.show({
                content: "Error saving note",
                cssClass: "e-toast-danger"
            });

        }
    }

    render() {
        return (
            <div className="h-100">
                <div id="dashboardRoot" className="dashboard h-100 p-3">
                    <div>Handicap History</div>
                    <div>Average Score by Par</div>
                    <div className="separator grid-two-col-span"></div>
                    <div className="grid-two-col-span">
                        <div className="d-flex">
                            <span>Recent Rounds</span>
                            <div className="ml-auto">
                                <button className="e-btn e-lib e-flat e-primary e-small align-self-end font-size-small">Add Round</button>
                            </div>
                        </div>
                    </div>
                    <div className="separator grid-two-col-span"></div>
                    <div className="grid-two-col-span">
                        <div className="d-flex">
                            <span>Notes</span>
                            <div className="ml-auto">
                                <button className="e-btn e-lib e-flat e-primary e-small align-self-end font-size-small" onClick={this.addNoteClick}>Add Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <NotesModal target="#root" onSaveCallback={this.onNoteSaved} ref={dialog => this._notesDialog = dialog} />
                <ToastComponent ref={toast => this._toastInstance = toast!} position={{X: "Right", Y: "Bottom"}} />
            </div>
        );
    }
}