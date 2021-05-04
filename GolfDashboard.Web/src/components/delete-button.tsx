import Button from 'devextreme-react/button'

export function DeleteButton(props: any) {
    return (<Button icon="trash" stylingMode="text" onClick={props.clickHandler} hint="Delete" />);
}