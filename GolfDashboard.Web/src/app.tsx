import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TopNavBar } from './navbar'
import { Sidebar } from './sidebar';
import { ClubsPage, DashboardPage, RoundsPage, NotesPage } from "./pages";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/app.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="root-content w-full overflow-hidden bg-primary-800">
        <TopNavBar />
        <Sidebar />
        <div id="page-content" className="relative flex flex-col bg-gray-100 rounded-tl">
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route path="/clubs" component={ClubsPage} />
            <Route path="/rounds" component={RoundsPage} />
            <Route path="/notes" component={NotesPage} />
          </Switch>
        </div>
      </div>
    );
  }
}