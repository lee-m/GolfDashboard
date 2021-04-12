import * as React from 'react';
import { Route } from 'react-router-dom';

import { TopNavBar } from './navbar'
import { Sidebar } from './sidebar';
import { ClubsPage, DashboardPage, RoundsPage, NotesPage } from "./pages";
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/app.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="root-content w-100 overflow-hidden">
        <TopNavBar />
        <Sidebar />
        <div className="page-content">
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
          <Route exact path="/" component={DashboardPage} />
          <Route path="/clubs" component={ClubsPage} />
          <Route path="/rounds" component={RoundsPage} />
          <Route path="/notes" component={NotesPage} />
        </div>
      </div>
    );
  }
}