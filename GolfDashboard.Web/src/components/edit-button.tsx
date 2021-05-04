import Button from 'devextreme-react/button'

import PencilSquare from '../images/pencil-square.svg';

export function EditButton(props: any) {
    return (<Button icon={PencilSquare} stylingMode="text" onClick={props.clickHandler} />);
}