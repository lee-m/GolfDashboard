import * as React from 'react';
import { TopNavBar } from './components/top-nav-bar';
import { Sidebar } from './components/sidebar';
import { Route } from 'react-router-dom';
import { NotesPage } from "./pages/notes-page";
import { ClubsPage } from "./pages/clubs-page";
import { DashboardPage } from "./pages/dashboard-page";
import { RoundsPage } from "./pages/rounds-page";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/app.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="root-content">
        <Sidebar />
        <div className="main-content">
          <TopNavBar />
          <div className="main-content-body">
            <Route exact path="/" component={DashboardPage} />
            <Route path="/clubs" component={ClubsPage} />
            <Route path="/notes" component={NotesPage} />
            <Route path="/rounds" component={RoundsPage} />
          </div>
        </div>
      </div>
    );
  }
}