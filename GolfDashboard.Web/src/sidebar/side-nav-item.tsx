import { Link, useLocation } from 'react-router-dom';

import CaretLogo from '../images/caret-right-fill.svg';

interface SideNavItemProps {
    linkURL: string;
    linkText: string;
    logo: string;
    logoAlt: string;
    isFirst?: boolean;
};

export function SideNavItem(props: SideNavItemProps) {

    let rowClasses = [ "pb-3", "pt-3"];
    let location = useLocation();

    if(location.pathname === props.linkURL) {
        rowClasses.push("sidebar-selected-item");
    }

    return (
        <div className={rowClasses.join(" ")}>
            <div className="flex justify-between pl-2 pr-2">
                <img src={props.logo} alt={props.logoAlt} className="sidebar-item-logo"></img>
                <Link to={props.linkURL} className="flex-grow pl-3 text-white hover:underline">{props.linkText}</Link>
                <img src={CaretLogo} className="text-white" alt="" />
            </div>
        </div>
    );
}