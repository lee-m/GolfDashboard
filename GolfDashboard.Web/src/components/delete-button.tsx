import Button from 'devextreme-react/button'

import DeleteSquare from '../images/x-square.svg';

export function DeleteButton(props: any) {
    return (<Button icon={DeleteSquare} stylingMode="text" onClick={props.clickHandler} />);
}