import { IconButton, ButtonProps } from '.';

export function EditButton(props: ButtonProps) {

    return (
        <IconButton 
            title="Edit" 
            iconCSSClass="bi-pencil-square"
            clickHandler={props.clickHandler} />
    )
}