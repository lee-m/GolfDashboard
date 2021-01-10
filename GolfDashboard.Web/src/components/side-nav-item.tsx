import * as React from 'react';
import { Link } from 'react-router-dom';

interface SideNavItemProps {
    linkURL: string;
    linkText: string;
    logo: string;
    logoAlt: string;
    isFirst?: boolean;
};

export class SideNavItem extends React.Component<SideNavItemProps> {

    render() {
        return (
            <div className={this.props.isFirst != null && this.props.isFirst ? "row" : "row pt-4"}>
                <div className="col-2">
                    <img src={this.props.logo} alt={this.props.logoAlt}></img>
                </div>
                <div className="col-9 text-white-tinted">
                    <Link to={this.props.linkURL} className="align-middle">{this.props.linkText}</Link>
                </div>
            </div>
        );
    }
}