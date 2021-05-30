import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { TopNavBar } from './navbar'
import { Sidebar } from './sidebar';
import { ClubsPage, EditClubPage, DashboardPage, RoundsPage, NotesPage, NoRouteMatch } from "./pages";

import 'react-toastify/dist/ReactToastify.css';
import './css/app.css';

export default function App(props: any) {

    return (
        <div className="root-content w-full overflow-hidden bg-primary-800">
            <TopNavBar />
            <Sidebar />
            <div id="page-content" className="relative flex flex-col bg-gray-100 rounded-tl">
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
                <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/clubs" component={ClubsPage} />
                    <Route exact path="/clubs/edit/:clubID" component={EditClubPage} />
                    <Route exact path="/rounds" component={RoundsPage} />
                    <Route exact path="/notes" component={NotesPage} />
                    <Route path="*" component={NoRouteMatch} />
                </Switch>
            </div>
        </div>
    );
}