import { IconButton, IconButtonProps } from '.';

export function EditButton(props: IconButtonProps) {

    return (
        <IconButton 
            title="Edit" 
            iconCSSClass="bi-pencil-square"
            clickHandler={props.clickHandler} />
    )
}