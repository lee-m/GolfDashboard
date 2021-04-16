export interface ButtonProps {
    clickHandler: () => void,
    text?: string,
    disabled: boolean
    outline?: boolean
}

export function Button(props: ButtonProps) {

    let cssClasses = ["self-center", "px-4", "py-2", "text-sm", "font-semibold", "rounded", "disabled:cursor-not-allowed"];
    
    if(props.outline) {
        cssClasses.push("border", "border-2", "border-gray-400", "hover:bg-gray-200", "disabled:opacity-75");
    } else {
        cssClasses.push("bg-secondary-500", "border-secondary-500", "text-white", "hover:bg-secondary-600", "disabled:opacity-50");
    }
    return (
        <button className={cssClasses.join(" ")} onClick={props.clickHandler} disabled={props.disabled}>
            {props.text}
        </button>
    );
}