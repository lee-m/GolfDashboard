import "./floating-label-input.css";

export interface FloatingLabelInputProps {
    name: string;
    label: string;
};

export function FloatingLabelInput(props: FloatingLabelInputProps) {

    return (
        <div className="floating-label-container">
            <input id={props.name} name={props.name} placeholder=" " type="text" className="floating-label-input"></input>
            <label htmlFor={props.name} className="floating-label-label">{props.label}</label>
        </div>
    )
}