import { IconButton, IconButtonProps } from '.';

export function DeleteButton(props: IconButtonProps) {

    return (
        <IconButton 
            title="Delete"  
            iconCSSClass="bi-x-square"
            clickHandler={props.clickHandler} />
    )
}