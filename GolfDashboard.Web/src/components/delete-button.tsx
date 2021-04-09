import { IconButton, ButtonProps } from '.';

export function DeleteButton(props: ButtonProps) {

    return (
        <IconButton 
            title="Delete"  
            iconCSSClass="bi-x-square"
            clickHandler={props.clickHandler} />
    )
}