import { SideNavItem } from './components/side-nav-item';
import { TopNavBar } from './components/top-nav-bar';
import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/app.css';

import HomeLogo from './images/home.svg';
import GolfCourseLogo from './images/golf_course.svg';
import GridLogo from './images/grid.svg';
import NotesLogo from './images/notes.svg';

export default class App extends React.Component {

  render() {
    return (
        <div className="root-content">
          <div className="sidebar">
            <div className="pt-5 pl-4 container">
              <SideNavItem linkURL="/" linkText="Dashboard" logo={HomeLogo} logoAlt="Home Logo" />
              <SideNavItem linkURL="/rounds" linkText="Round History" logo={GridLogo} logoAlt="Round History Logo" />
              <SideNavItem linkURL="/notes" linkText="Notes" logo={NotesLogo} logoAlt="Notes Logo" />
              <SideNavItem linkURL="/clubs" linkText="Find a Golf Club" logo={GolfCourseLogo} logoAlt="Find a Course Logo" />
            </div>
          </div>
          <div className="main-content d-flex flex-column">
              <TopNavBar />
              <div className="main-content-body flex-grow-1">
                Main Content
              </div>
          </div>
        </div>
      );
  }
}