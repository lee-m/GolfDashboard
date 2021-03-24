import React from "react";

interface IconButtonProps {
    iconCSSClass: string,
    title: string,
    clickHandler: () => void
}

export class IconButton extends React.Component<IconButtonProps> {

    render() {

        return (
            <button className="btn" title={this.props.title} onClick={e => this.props.clickHandler()}>
                <i className={"bi " + this.props.iconCSSClass}></i>
            </button>
        );
    }
}