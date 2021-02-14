import * as React from 'react';
import { SideNavItem } from '../components/side-nav-item';

import "../css/components/sidebar.css";

import HomeLogo from '../images/home.svg';
import GolfCourseLogo from '../images/golf_course.svg';
import GridLogo from '../images/grid.svg';
import NotesLogo from '../images/notes.svg';

export class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar">
                <div className="container">
                    <SideNavItem isFirst={true} linkURL="/" linkText="Dashboard" logo={HomeLogo} logoAlt="Home Logo" />
                    <SideNavItem linkURL="/rounds" linkText="Round History" logo={GridLogo} logoAlt="Round History Logo" />
                    <SideNavItem linkURL="/notes" linkText="Notes" logo={NotesLogo} logoAlt="Notes Logo" />
                    <SideNavItem linkURL="/clubs" linkText="Find a Club" logo={GolfCourseLogo} logoAlt="Find a Course Logo" />
                </div>
            </div>
        );
    }
}