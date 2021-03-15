import * as React from 'react';
import { Route } from 'react-router-dom';

import { TopNavBar } from './navbar'
import { Sidebar } from './sidebar';
import { ClubsPage, DashboardPage, RoundsPage } from "./pages";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/app.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="root-content">
        <TopNavBar />
        <div className="main-content">
          <Sidebar />
          <div className="main-content-body">
            <Route exact path="/" component={DashboardPage} />
            <Route path="/clubs" component={ClubsPage} />
            <Route path="/rounds" component={RoundsPage} />
          </div>
        </div>
      </div>
    );
  }
}