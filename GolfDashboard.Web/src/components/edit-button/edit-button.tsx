import Button from 'devextreme-react/button'

import PencilIcon from '../../images/pencil.svg';

export function EditButton(props: any) {
    return (<Button icon={PencilIcon} stylingMode="text" onClick={props.clickHandler} hint="Edit" />);
}