interface IconButtonProps {
    iconCSSClass: string,
    title: string,
    clickHandler: () => void
}

export function IconButton(props: IconButtonProps) {
    return (
        <button className="btn" title={props.title} onClick={e => props.clickHandler()}>
            <i className={"bi " + props.iconCSSClass}></i>
        </button>
    );
}