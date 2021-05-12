import Button from 'devextreme-react/button'

import TrashIcon from '../images/trash.svg';

export function DeleteButton(props: any) {
    return (<Button icon={TrashIcon} stylingMode="text" onClick={props.clickHandler} hint="Delete" />);
}