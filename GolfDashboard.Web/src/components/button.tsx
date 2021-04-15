export interface ButtonProps {
    clickHandler: () => void,
    text?: string,
    disabled: boolean
}

export function Button(props: ButtonProps) {
    return (
        <button className="bg-secondary-500 
                           self-center 
                           px-4 
                           py-2 
                           text-xs
                           font-semibold 
                           tracking-wider 
                           text-white
                           rounded 
                           hover:bg-secondary-700
                           disabled:opacity-50
                           disabled:cursor-not-allowed"
                           onClick={props.clickHandler}
                           disabled={props.disabled}>
            {props.text}
        </button>
    );
}