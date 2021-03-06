import { SideNavItem } from './side-nav-item';

import HomeLogo from '../images/home.svg';
import GolfCourseLogo from '../images/golf_course.svg';
import GridLogo from '../images/grid.svg';
import NotesLogo from '../images/notes.svg';

export function Sidebar(props: any) {

    return (
        <div className="sidebar bg-primary-800">
            <div className="container">
                <SideNavItem isFirst={true} linkURL="/" linkText="Dashboard" logo={HomeLogo} logoAlt="Home Logo" />
                <SideNavItem linkURL="/rounds" linkText="Round History" logo={GridLogo} logoAlt="Round History Logo" />
                <SideNavItem linkURL="/notes" linkText="Notes" logo={NotesLogo} logoAlt="Notes Logo" />
                <SideNavItem linkURL="/clubs" linkText="Find a Club" logo={GolfCourseLogo} logoAlt="Find a Course Logo" />
            </div>
        </div>
    );
}