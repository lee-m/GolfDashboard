import * as React from 'react';

interface SideNavItemProps {
    linkURL: string;
    linkText: string;
    logo: string;
    logoAlt: string;
};

export class SideNavItem extends React.Component<SideNavItemProps> {

    render() {
        return (
            <div className="row pt-4">
                <div className="col-2">
                    <img src={this.props.logo} alt={this.props.logoAlt}></img>
                </div>
                <div className="col-9 text-white-tinted">
                    <a href={this.props.linkURL} className="align-middle">{this.props.linkText}</a>
                </div>
            </div>
        );
    }
}