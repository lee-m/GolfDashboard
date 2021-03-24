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

    let rowClasses = [ "row", "pb-2"];
    let location = useLocation();

    if(props.isFirst != null && props.isFirst) {
        rowClasses.push("pt-2");
        rowClasses.push("d-flex");
        rowClasses.push("justify-content-between");
    } else {
        rowClasses.push("pt-2 mt-3");
    }

    if(location.pathname === props.linkURL) {
        rowClasses.push("sidebar-selected-item");
    }

    return (
        <div className={rowClasses.join(" ")}>
            <div className="col-2">
                <img src={props.logo} alt={props.logoAlt} className="sidebar-item-logo"></img>
            </div>
            <div className="col-10 text-white-tinted">
                <div className="d-flex justify-content-between">
                    <Link to={props.linkURL} className="align-middle">{props.linkText}</Link>
                    <img src={CaretLogo} className="text-white" alt="" />
                </div>
            </div>
        </div>
    );
}