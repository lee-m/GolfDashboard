import { ButtonProps } from './button-props';

interface IconButtonProps extends ButtonProps {
    iconCSSClass: string,
    title: string,
}

export function IconButton(props: IconButtonProps) {
    return (
        <button className="btn" title={props.title} onClick={e => props.clickHandler()}>
            <i className={"bi " + props.iconCSSClass}></i>
        </button>
    );
}